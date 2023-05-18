import { View, Text, FlatList } from "react-native";
import React from "react";
import { FONTS, serverBaseURL } from "../../constants";
import RecipeSkeleton from "../skeletons/RecipeSkeleton/RecipeSkeleton";
import { useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { RecipeType, ResponseType } from "../../types";
import {
  useBookmarksStore,
  useNetworkStore,
  useSettingsStore,
} from "../../store";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppParamList } from "../../params";
import Recipe from "../Recipe/Recipe";

const Recommendations: React.FunctionComponent<{
  navigation: StackNavigationProp<AppParamList, "Home">;
}> = ({ navigation }) => {
  const [historyProductId, setHistoryProductId] = React.useState("");
  const { bookmarks } = useBookmarksStore();
  const {
    settings: { limit },
  } = useSettingsStore();
  const { network } = useNetworkStore();
  const client = useQueryClient();
  const [hasNextPage, setHasNextPage] = React.useState<boolean>(false);
  const [recipes, setRecipes] = React.useState<RecipeType[]>([]);
  const { isLoading, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["recipes", limit, historyProductId],
    queryFn: async ({ pageParam, queryKey }) => {
      const [_, _limit, lastInHistoryRecipeId] = queryKey;
      const res = await fetch(
        `${serverBaseURL}/api/recipes/recipes?lastId=${
          pageParam ?? ""
        }&limit=${_limit}&lastInHistoryRecipeId=${lastInHistoryRecipeId}`
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
        setRecipes([]);
        await client.invalidateQueries(["recipes", limit, historyProductId], {
          exact: true,
        });
      })();
    }
    return () => {
      mounted = false;
    };
  }, [limit, historyProductId]);

  React.useEffect(() => {
    const categoryHistory = bookmarks.find((r) => r.maincategory === "recipes");
    if (categoryHistory?.id) {
      setHistoryProductId(categoryHistory.id);
    }
  }, [bookmarks]);

  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontFamily: FONTS.regularBold, marginBottom: 5 }}>
        RECOMMENDED RECIPES FOR YOU
      </Text>
      {!network.isInternetReachable ||
      isLoading ||
      (isFetching && recipes.length === 0) ? (
        <FlatList
          data={Array(21).fill(null)}
          keyExtractor={(_, i) => i.toString()}
          renderItem={() => <RecipeSkeleton />}
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={recipes}
          contentContainerStyle={{
            flexDirection: "row",
          }}
          keyExtractor={({ id }) => id}
          renderItem={({ index, item: recipe }) => (
            <Recipe
              cardType="recommentation"
              navigation={navigation}
              recipe={recipe}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default Recommendations;
