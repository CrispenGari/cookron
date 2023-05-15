import { StackNavigationProp } from "@react-navigation/stack";
import { useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { View, Text, ScrollView } from "react-native";
import { serverBaseURL, COLORS } from "../../../constants";
import { AppParamList } from "../../../params";
import { MainCategoryType, RecipeType, ResponseType } from "../../../types";
import Recipe from "../../Recipe/Recipe";
import RippleLoadingIndicator from "../../RippleLoadingIndicator/RippleLoadingIndicator";
import RecipeSkeleton from "../../skeletons/RecipeSkeleton/RecipeSkeleton";
import { styles } from "../../../styles";

export const CategoryRecipes: React.FunctionComponent<{
  category: MainCategoryType;
  toggle: () => void;
  navigation: StackNavigationProp<AppParamList, "Home">;
  onMomentumScrollBegin: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onMomentumScrollEnd: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
}> = ({
  category,
  onMomentumScrollBegin,
  onMomentumScrollEnd,
  toggle,
  navigation,
}) => {
  const [hasNextPage, setHasNextPage] = React.useState<boolean>(false);
  const [recipes, setRecipes] = React.useState<RecipeType[]>([]);
  const client = useQueryClient();
  const { isLoading, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["recipes", category],
    queryFn: async ({ pageParam, queryKey }) => {
      const [_, cate] = queryKey;
      const res = await fetch(
        `${serverBaseURL}/api/recipes/${cate}?lastId=${pageParam}`
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
    if (mounted && !!category) {
      (async () => {
        setRecipes([]);
        await client.invalidateQueries(["recipes", category], { exact: true });
      })();
    }
    return () => {
      mounted = false;
    };
  }, [category]);
  return (
    <ScrollView
      contentContainerStyle={{
        padding: 10,
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-evenly",
      }}
      style={{ flex: 1 }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      onMomentumScrollBegin={onMomentumScrollBegin}
      onMomentumScrollEnd={onMomentumScrollEnd}
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
      {isLoading ? (
        Array(21)
          .fill(null)
          .map((_, index) => <RecipeSkeleton key={index} />)
      ) : recipes.length === 0 && !isFetching && !isLoading ? (
        <Text style={[styles.p, { padding: 20, textAlign: "center" }]}>
          No Recipes.
        </Text>
      ) : (
        recipes.map((recipe) => (
          <Recipe
            navigation={navigation}
            recipe={recipe}
            index={0}
            key={recipe.id}
            toggle={toggle}
          />
        ))
      )}
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
    </ScrollView>
  );
};
