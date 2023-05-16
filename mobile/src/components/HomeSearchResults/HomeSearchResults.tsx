import { ScrollView, View } from "react-native";
import React from "react";
import { COLORS, serverBaseURL } from "../../constants";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppParamList } from "../../params";
import { styles } from "../../styles";
import TypeWriter from "react-native-typewriter";
import { RecipeType, ResponseType } from "../../types";
import { useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import RippleLoadingIndicator from "../RippleLoadingIndicator/RippleLoadingIndicator";
import SearchResult from "../SearchResult/SearchResult";
import { useNetworkStore, useSettingsStore } from "../../store";

interface Props {
  navigation: StackNavigationProp<AppParamList, "Home">;
  searchTerm: string;
}
const HomeSearchResults: React.FunctionComponent<Props> = ({
  navigation,
  searchTerm,
}) => {
  const [hasNextPage, setHasNextPage] = React.useState<boolean>(false);
  const [recipes, setRecipes] = React.useState<RecipeType[]>([]);
  const {
    settings: { limit },
  } = useSettingsStore();

  const { network } = useNetworkStore();
  const client = useQueryClient();
  const { isLoading, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["recipes", searchTerm, limit],
    queryFn: async ({ pageParam, queryKey }) => {
      const [_, term, _limit] = queryKey;
      const res = await fetch(
        `${serverBaseURL}/api/recipes/recipes/search?searchTerm=${term}&lastId=${pageParam}&limit=${_limit}`
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

  if (network.isInternetReachable) {
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
          {`You don't have internet connection to search in the recipe database.`}
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
      {!!!searchTerm && (
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
          the engine.
        </TypeWriter>
      )}
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
          {`Couldn't find the matches for the search "${searchTerm}".`}
        </TypeWriter>
      ) : null}

      {recipes.map((recipe) => (
        <SearchResult key={recipe.id} recipe={recipe} navigation={navigation} />
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

export default HomeSearchResults;
