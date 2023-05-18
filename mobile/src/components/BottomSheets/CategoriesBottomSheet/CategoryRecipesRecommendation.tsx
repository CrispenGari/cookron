import { View, Text, FlatList } from "react-native";
import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppParamList } from "../../../params";
import { MainCategoryType, RecipeType, ResponseType } from "../../../types";
import { useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { serverBaseURL, FONTS, COLORS } from "../../../constants";
import {
  useBookmarksStore,
  useSettingsStore,
  useNetworkStore,
} from "../../../store";
import Recipe from "../../Recipe/Recipe";
import RecipeSkeleton from "../../skeletons/RecipeSkeleton/RecipeSkeleton";
import RippleLoadingIndicator from "../../RippleLoadingIndicator/RippleLoadingIndicator";

const CategoryRecipesRecommendation: React.FunctionComponent<{
  category: MainCategoryType;
  toggle: () => void;
  navigation: StackNavigationProp<AppParamList, "Home">;
}> = ({ navigation, category, toggle }) => {
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
    queryKey: ["recipes", limit, historyProductId, category],
    queryFn: async ({ pageParam, queryKey }) => {
      const [_, _limit, lastInHistoryRecipeId, _cate] = queryKey;
      const res = await fetch(
        `${serverBaseURL}/api/recipes/${_cate}?lastId=${
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
        await client.invalidateQueries(
          ["recipes", limit, historyProductId, category],
          {
            exact: true,
          }
        );
      })();
    }
    return () => {
      mounted = false;
    };
  }, [limit, historyProductId, category]);

  React.useEffect(() => {
    const categoryHistory = bookmarks.find((r) => r.maincategory === category);
    if (categoryHistory?.id) {
      setHistoryProductId(categoryHistory.id);
    }
  }, [category, bookmarks]);

  return (
    <View style={{ padding: 10 }}>
      <Text
        style={{
          textTransform: "uppercase",
          fontFamily: FONTS.regularBold,
          marginBottom: 5,
        }}
      >
        RECOMMENDED STUFF UNDER {category}
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
          scrollEventThrottle={16}
          onScroll={async ({
            nativeEvent: { layoutMeasurement, contentOffset, contentSize },
          }) => {
            const reachRight =
              layoutMeasurement.width + contentOffset.x >= contentSize.width;
            if (reachRight && hasNextPage) {
              await fetchNextPage();
            }
          }}
          ListFooterComponent={() =>
            hasNextPage && isFetching ? (
              <View
                style={{
                  width: 200,
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  flex: 1,
                }}
              >
                <RippleLoadingIndicator color={COLORS.secondary} size={20} />
              </View>
            ) : null
          }
          data={recipes}
          contentContainerStyle={{
            flexDirection: "row",
          }}
          keyExtractor={({ id }) => id}
          renderItem={({ item: recipe }) => (
            <Recipe
              cardType="recommentation"
              navigation={navigation}
              recipe={recipe}
              toggle={toggle}
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

export default CategoryRecipesRecommendation;
