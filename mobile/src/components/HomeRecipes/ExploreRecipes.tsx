import {
  View,
  Text,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import React from "react";
import { FONTS, serverBaseURL } from "../../constants";
import Recipes from "../Recipes/Recipes";
import { useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { RecipeType, ResponseType } from "../../types";
import { useNetworkStore, useSettingsStore } from "../../store";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppParamList } from "../../params";
import { ScrollView } from "react-native-gesture-handler";
import RecipeSkeleton from "../skeletons/RecipeSkeleton/RecipeSkeleton";

const ExploreRecipes: React.FunctionComponent<{
  navigation: StackNavigationProp<AppParamList, "Home">;

  onMomentumScrollBegin: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onMomentumScrollEnd: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
}> = ({ onMomentumScrollBegin, onMomentumScrollEnd, navigation }) => {
  const {
    settings: { limit },
  } = useSettingsStore();
  const { network } = useNetworkStore();
  const client = useQueryClient();
  const [hasNextPage, setHasNextPage] = React.useState<boolean>(false);
  const [recipes, setRecipes] = React.useState<RecipeType[]>([]);
  const { isLoading, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["recipes", limit],
    queryFn: async ({ pageParam, queryKey }) => {
      const [_, _limit] = queryKey;
      const res = await fetch(
        `${serverBaseURL}/api/recipes/recipes?lastId=${
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
        setRecipes([]);
        await client.invalidateQueries(["recipes", limit], {
          exact: true,
        });
      })();
    }
    return () => {
      mounted = false;
    };
  }, [limit]);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontFamily: FONTS.regularBold, marginBottom: 5 }}>
        EXPLORE RECIPES
      </Text>

      {!network.isInternetReachable ||
      isLoading ||
      (isFetching && recipes.length === 0) ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            paddingBottom: 100,
            paddingTop: 10,
          }}
          style={{ flex: 1 }}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onMomentumScrollEnd={onMomentumScrollEnd}
        >
          {Array(limit)
            .fill(null)
            .map((e, i) => (
              <RecipeSkeleton key={i} />
            ))}
        </ScrollView>
      ) : (
        <Recipes
          isLoading={isFetching}
          onMomentumScrollEnd={onMomentumScrollEnd}
          fetchNextPageData={fetchNextPage}
          onMomentumScrollBegin={onMomentumScrollBegin}
          navigation={navigation}
          recipes={recipes}
          hasNextPage={hasNextPage}
        />
      )}
    </View>
  );
};

export default ExploreRecipes;
