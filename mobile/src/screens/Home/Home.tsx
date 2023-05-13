import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Button,
} from "react-native";
import React from "react";
import { COLORS, logo, serverBaseURL } from "../../constants";
import { AppNavProps } from "../../params";
import Header from "../../components/Header/Header";
import { Transition, Transitioning } from "react-native-reanimated";
import TabNav from "../../components/TabNav/TabNav";
import { useInfiniteQuery } from "@tanstack/react-query";
import { RecipeType, ResponseType } from "../../types";
import Recipes from "../../components/Recipes/Recipes";
import RecipeSkeleton from "../../components/skeletons/RecipeSkeleton/RecipeSkeleton";

import { useMediaQuery } from "../../hooks/useMediaQuery";
import { styles } from "../../styles";
import { onImpact } from "../../utils";
const Home: React.FunctionComponent<AppNavProps<"Home">> = ({ navigation }) => {
  const {
    dimension: { height, width },
  } = useMediaQuery();
  const [hasNextPage, setHasNextPage] = React.useState<boolean>(false);
  const [recipes, setRecipes] = React.useState<RecipeType[]>([]);
  const { isLoading, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["recipes"],
    queryFn: async ({ pageParam }) => {
      const res = await fetch(
        `${serverBaseURL}/api/recipes/recipes?lastId=${pageParam}`
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

  const navRef = React.useRef<any>();
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
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: ({}) => <Header />,
    });
  }, [navigation]);
  React.useLayoutEffect(() => {
    if (navRef.current) {
      navRef.current.animateNextTransition();
    }
  }, []);
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

  return (
    <View
      style={{
        backgroundColor: COLORS.main,
        flex: 1,
        position: "relative",
      }}
    >
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
      <View style={{ flex: 1 }}>
        {isLoading ? (
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
          />
        ) : (
          <Text>No Recipes.</Text>
        )}
      </View>
    </View>
  );
};

export default Home;

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
