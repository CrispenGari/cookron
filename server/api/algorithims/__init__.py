import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer
from api.constants import MAX_SEARCH_RECOMMENDATION


class DR:
    def __init__(self, filename: str):
        self.filename = filename
        self.dataframe = pd.read_json(filename)
        self.C = self.dataframe.rattings.mean()
        self.m = self.dataframe.vote_count.quantile(0.9)

    def weighted_rating(self, dataframe):
        v = dataframe.vote_count
        R = dataframe.rattings
        return (v / (v + self.m) * R) + (self.m / (self.m + v) * self.C)

    def __call__(self):
        self.dataframe["score"] = self.dataframe.apply(self.weighted_rating, axis=1)
        self.dataframe.sort_values("score", ascending=False, inplace=True)
        self.dataframe.drop_duplicates(subset=["name"], inplace=True)
        return [i for i in self.dataframe["id"]]


def get_recommendations_from_description(name, filename):
    """
    The idea is that when you like or search the recipe of this name,
    you probabbly want the simmilar recipes to that one.
    """
    dataframe = pd.read_json(filename)
    dataframe.drop_duplicates(subset=["name"], inplace=True)
    dataframe = dataframe.reset_index(drop=True)
    tfidf = TfidfVectorizer(stop_words="english")
    tfidf_matrix = tfidf.fit_transform(dataframe.description)
    cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
    indices = pd.Series(dataframe.index, index=dataframe["name"])
    idx = indices[name]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[0:MAX_SEARCH_RECOMMENDATION]
    recipe_indices = [i[0] for i in sim_scores]
    return [i for i in dataframe["id"].iloc[recipe_indices]]


features = ["author", "difficult", "subcategory", "dish_type", "maincategory"]


def clean_data(x):
    if isinstance(x, str):
        return str.lower(x.replace(" ", ""))
    else:
        return ""


def create_soup(x):
    return (
        x["author"]
        + x["difficult"]
        + " "
        + x["subcategory"]
        + " "
        + x["dish_type"]
        + " "
        + x["maincategory"]
    )


def get_recommendations_from_meta_data(name, filename):
    dataframe = pd.read_json(filename)
    dataframe.drop_duplicates(subset=["name"], inplace=True)
    dataframe = dataframe.reset_index(drop=True)
    for feature in features:
        dataframe[feature] = dataframe[feature].apply(clean_data)
    dataframe["soup"] = dataframe.apply(create_soup, axis=1)
    count = CountVectorizer(stop_words="english")
    count_matrix = count.fit_transform(dataframe.soup)
    cosine_sim = cosine_similarity(count_matrix, count_matrix)
    indices = pd.Series(dataframe.index, index=dataframe.name)
    idx = indices[name]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[0:MAX_SEARCH_RECOMMENDATION]
    recipes_indices = [i[0] for i in sim_scores]
    return [i for i in dataframe["id"].iloc[recipes_indices]]
