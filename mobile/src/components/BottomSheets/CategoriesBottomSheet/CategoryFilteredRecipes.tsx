import { ScrollView, View } from "react-native";
import React from "react";

import { StackNavigationProp } from "@react-navigation/stack";

import TypeWriter from "react-native-typewriter";

import { useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { serverBaseURL, COLORS } from "../../../constants";
import { AppParamList } from "../../../params";
import {
  useSettingsStore,
  useNetworkStore,
  useSearchHistoryStore,
} from "../../../store";
import { styles } from "../../../styles";
import { MainCategoryType, RecipeType, ResponseType } from "../../../types";
import RippleLoadingIndicator from "../../RippleLoadingIndicator/RippleLoadingIndicator";
import SearchResult from "../../SearchResult/SearchResult";
import SearchHistoryItem from "../../SearchHistoryItem/SearchHistoryItem";

interface Props {
  navigation: StackNavigationProp<AppParamList, "Home">;
  searchTerm: string;
  category: MainCategoryType;
  toggle: () => void;
  setTerm: React.Dispatch<React.SetStateAction<string>>;
}
const CategoryFilteredRecipes: React.FunctionComponent<Props> = ({
  navigation,
  searchTerm,
  category,
  toggle,
  setTerm,
}) => {
  const [hasNextPage, setHasNextPage] = React.useState<boolean>(false);
  const [recipes, setRecipes] = React.useState<RecipeType[]>([]);
  const {
    settings: { limit },
  } = useSettingsStore();
  const { history } = useSearchHistoryStore();
  const [searchHistory, setSearchHistory] = React.useState<RecipeType[]>([]);

  const { network } = useNetworkStore();
  const client = useQueryClient();
  const { isLoading, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["recipes", searchTerm, limit, category],
    queryFn: async ({ pageParam, queryKey }) => {
      const [_, term, _limit, _category] = queryKey;
      const res = await fetch(
        `${serverBaseURL}/api/recipes/${_category}/search?searchTerm=${term}&lastId=${
          pageParam ?? ""
        }&limit=${_limit}`
      );
      const data = await res.json();
      return data as ResponseType;
    },
    staleTime: Infinity,
    getNextPageParam: ({ lastId }) => lastId,
    keepPreviousData: true,
    onSuccess: (data) => {
      setHasNextPage(data.pages.at(-1)?.hasNext || false);
      setRecipes(data.pages.flatMap((page) => page.recipes));
    },
  });

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      (async () => {
        if (!searchTerm) {
          setRecipes([]);
        } else {
          setRecipes([]);
          await client.invalidateQueries(["recipes", searchTerm, limit], {
            exact: true,
          });
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, [searchTerm, limit]);

  React.useEffect(() => {
    setSearchHistory(
      history
        .filter(({ maincategory }) => maincategory === category)
        .slice(0, 3)
    );
  }, [history, category]);

  if (!network.isInternetReachable) {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingBottom: 100,
          paddingTop: 10,
        }}
        style={{ flex: 1, backgroundColor: COLORS.main }}
      >
        <TypeWriter
          style={[
            styles.p,
            {
              textAlign: "center",
              padding: 20,
              height: 100,
            },
          ]}
          typing={1}
          maxDelay={-50}
        >
          {`You don't have internet connection to search in the "${category}" in our recipe database.`}
        </TypeWriter>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      contentContainerStyle={{
        paddingBottom: 100,
        paddingTop: 10,
      }}
      style={{ flex: 1, backgroundColor: COLORS.main }}
      onScroll={async ({ nativeEvent }) => {
        const isAtEnd =
          (
            nativeEvent.contentOffset.y + nativeEvent.layoutMeasurement.height
          ).toFixed(0) === nativeEvent.contentSize.height.toFixed(0);
        if (isAtEnd && hasNextPage) {
          await fetchNextPage();
        }
      }}
    >
      {!!!searchTerm && searchHistory.length === 0 ? (
        <TypeWriter
          style={[
            styles.p,
            {
              textAlign: "center",
              padding: 20,
              height: 100,
            },
          ]}
          typing={1}
          maxDelay={-50}
        >
          Search Recipes, Dishes, Food, Recipe Authors, Description, etc. from
          the {category} database.
        </TypeWriter>
      ) : null}
      {recipes.length === 0 &&
      searchTerm.trim().length > 3 &&
      !isFetching &&
      !isLoading ? (
        <TypeWriter
          style={[
            styles.p,
            {
              textAlign: "center",
              padding: 20,
              height: 100,
            },
          ]}
          typing={1}
          maxDelay={-50}
        >
          {`Couldn't find the matches for the search "${searchTerm}" for the category ${category}.`}
        </TypeWriter>
      ) : null}

      {searchHistory.length > 0 && recipes.length === 0 && !searchTerm
        ? searchHistory.map((h) => (
            <SearchHistoryItem setTerm={setTerm} history={h} key={h.id} />
          ))
        : recipes.map((recipe) => (
            <SearchResult
              toggle={toggle}
              key={recipe.id}
              recipe={recipe}
              navigation={navigation}
            />
          ))}

      {isFetching && recipes.length === 0 ? (
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            height: 100,
          }}
        >
          <RippleLoadingIndicator color={COLORS.secondary} size={20} />
        </View>
      ) : null}
      {recipes.length !== 0 ? (
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            height: 100,
          }}
        >
          {isFetching ? (
            <RippleLoadingIndicator color={COLORS.secondary} size={20} />
          ) : null}
        </View>
      ) : null}
    </ScrollView>
  );
};

export default CategoryFilteredRecipes;
