import {
  View,
  Text,
  Animated,
  ScrollView,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import { Transition, Transitioning } from "react-native-reanimated";
import { COLORS, logo, serverBaseURL } from "../../constants";
import { styles } from "../../styles";
import { onImpact } from "../../utils";
import { CategoriesBottomSheet } from "../BottomSheets";
import Favorites from "../Favorites/Favorites";
import Recipes from "../Recipes/Recipes";
import TabNav from "../TabNav/TabNav";
import RecipeSkeleton from "../skeletons/RecipeSkeleton/RecipeSkeleton";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppParamList } from "../../params";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { RecipeType, ResponseType } from "../../types";
import { useMediaQuery } from "../../hooks";
import { useNetworkStore, useSettingsStore } from "../../store";

const HomeRecipes: React.FunctionComponent<{
  navigation: StackNavigationProp<AppParamList, "Home">;
}> = ({ navigation }) => {
  const client = useQueryClient();
  const {
    dimension: { height, width },
  } = useMediaQuery();
  const navRef = React.useRef<any>();
  const {
    settings: { limit },
  } = useSettingsStore();
  const { network } = useNetworkStore();
  const zIndex = React.useRef(new Animated.Value(1)).current;
  const opacity = React.useRef(new Animated.Value(1)).current;
  const [state, setState] = React.useState({
    selectedTab: 0,
  });
  const selectTab = (index: number) => {
    if (navRef.current) {
      navRef.current.animateNextTransition();
    }
    onImpact();
    setState((state) => ({ ...state, selectedTab: index }));
  };

  const [hasNextPage, setHasNextPage] = React.useState<boolean>(false);
  const [recipes, setRecipes] = React.useState<RecipeType[]>([]);
  const { isLoading, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["recipes", limit],
    queryFn: async ({ pageParam, queryKey }) => {
      const [_, _limit] = queryKey;
      const res = await fetch(
        `${serverBaseURL}/api/recipes/recipes?lastId=${pageParam}&limit=${_limit}`
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

  const onMomentumScrollBegin = (
    e: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    Animated.sequence([
      Animated.timing(zIndex, {
        duration: 0,
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        duration: 0,
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  };
  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    Animated.sequence([
      Animated.timing(zIndex, {
        duration: 300,
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        duration: 300,
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  };
  React.useLayoutEffect(() => {
    if (navRef.current) {
      navRef.current.animateNextTransition();
    }
  }, []);
  const navTransition = (
    <Transition.Together>
      <Transition.In
        type="slide-right"
        durationMs={1000}
        interpolation="easeInOut"
      />
      <Transition.In type="fade" durationMs={1000} />
      <Transition.Change />
      <Transition.Out type="fade" durationMs={1000} />
    </Transition.Together>
  );

  const [openCategories, setOpenCategories] = React.useState<boolean>(false);
  const toggleOpenCategories = () => setOpenCategories((state) => !state);

  return (
    <View
      style={{
        backgroundColor: COLORS.main,
        flex: 1,
        position: "relative",
      }}
    >
      <CategoriesBottomSheet
        open={openCategories}
        toggle={toggleOpenCategories}
        navigation={navigation}
      />
      <Animated.View
        style={{
          zIndex,
          position: "absolute",
          opacity,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            onImpact();
            toggleOpenCategories();
          }}
          style={[
            style.button,
            {
              top: height * 0.72,
              left: width / 2 - 30,
            },
          ]}
          activeOpacity={0.7}
        >
          <Image source={logo} style={style.img} />
        </TouchableOpacity>
      </Animated.View>
      <Transitioning.View transition={navTransition} ref={navRef}>
        <TabNav state={state} selectTab={selectTab} setState={setState} />
      </Transitioning.View>
      {state.selectedTab === 1 ? (
        <View style={{ flex: 1 }}>
          <Favorites
            navigation={navigation}
            onMomentumScrollEnd={onMomentumScrollEnd}
            onMomentumScrollBegin={onMomentumScrollBegin}
          />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          {(isFetching && recipes.length === 0) ||
          !network.isInternetReachable ? (
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.p,
                  {
                    fontSize: 20,
                    marginLeft: 10,
                  },
                ]}
              >
                RECIPES
              </Text>
              <ScrollView
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
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
                {Array(15)
                  .fill(null)
                  .map((_, index) => (
                    <RecipeSkeleton key={index} />
                  ))}
              </ScrollView>
            </View>
          ) : recipes.length ? (
            <Recipes
              onMomentumScrollEnd={onMomentumScrollEnd}
              recipes={recipes}
              onMomentumScrollBegin={onMomentumScrollBegin}
              fetchNextPageData={async () => {
                if (!isLoading && !isFetching && hasNextPage) {
                  await fetchNextPage();
                }
              }}
              isLoading={isFetching || isLoading}
              navigation={navigation}
            />
          ) : (
            <Text style={[styles.p, { padding: 20, textAlign: "center" }]}>
              No Recipes.
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

export default HomeRecipes;

const style = StyleSheet.create({
  img: {
    width: "100%",
    height: "100%",
    flex: 1,
    resizeMode: "contain",
  },
  button: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    padding: 5,
    shadowOffset: { height: 2, width: 2 },
    shadowColor: COLORS.red,
    shadowOpacity: 1,
    shadowRadius: 5,
  },
});
