import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import React from "react";
import { BottomSheet } from "react-native-btr";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { COLORS, serverBaseURL } from "../../../constants";
import { Transition, Transitioning } from "react-native-reanimated";
import { CategoriesTabs } from "./CategoriesTabs";
import { CategoriesHeader } from "./CategoriesHeader";
import { MainCategoryType, RecipeType } from "../../../types";
import { onImpact } from "../../../utils";
import { Animated } from "react-native";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { ResponseType } from "../../../types";
import Recipe from "../../Recipe/Recipe";
import ContentLoader from "../../ContentLoader/ContentLoader";
import RecipeSkeleton from "../../skeletons/RecipeSkeleton/RecipeSkeleton";
import RippleLoadingIndicator from "../../RippleLoadingIndicator/RippleLoadingIndicator";
interface Props {
  toggle: () => void;
  open: boolean;
}
const CreateEngineBottomSheet: React.FunctionComponent<Props> = ({
  toggle,
  open,
}) => {
  const navRef = React.useRef<any>();
  const zIndex = React.useRef(new Animated.Value(1)).current;
  const opacity = React.useRef(new Animated.Value(1)).current;
  const [tab, setTab] = React.useState<MainCategoryType>("recipes");
  const {
    dimension: { height, width },
  } = useMediaQuery();
  React.useLayoutEffect(() => {
    if (tab && navRef.current) {
      navRef.current.animateNextTransition();
    }
  }, [tab]);

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
      <Transition.In type="fade" durationMs={1000} />
      <Transition.Change />
      <Transition.Out type="fade" durationMs={1000} />
    </Transition.Together>
  );

  return (
    <BottomSheet
      visible={!!open}
      onBackButtonPress={toggle}
      onBackdropPress={toggle}
    >
      <SafeAreaView
        style={{
          backgroundColor: COLORS.main,
          height: height - 100,
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
        }}
      >
        <CategoriesHeader tab={tab} />
        <Transitioning.View transition={navTransition} ref={navRef}>
          <CategoriesTabs tab={tab} setTab={setTab} />
        </Transitioning.View>
        <CategoryRecipes
          onMomentumScrollEnd={onMomentumScrollEnd}
          onMomentumScrollBegin={onMomentumScrollBegin}
          category={tab}
        />
        <Animated.View
          style={{
            position: "absolute",
            opacity,
            zIndex,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              onImpact();
              toggle();
            }}
            style={[
              style.button,
              {
                top: height * 0.77,
                left: width / 2 - 25,
              },
            ]}
            activeOpacity={0.7}
          >
            <Ionicons name="ios-close" size={24} color={COLORS.tertiary} />
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    </BottomSheet>
  );
};

export default CreateEngineBottomSheet;

const CategoryRecipes: React.FunctionComponent<{
  category: MainCategoryType;
  onMomentumScrollBegin: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onMomentumScrollEnd: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
}> = ({ category, onMomentumScrollBegin, onMomentumScrollEnd }) => {
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
        <Text>No recipes</Text>
      ) : (
        recipes.map((recipe) => (
          <Recipe recipe={recipe} index={0} key={recipe.id} />
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

const style = StyleSheet.create({
  button: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    padding: 5,
    shadowOffset: { height: 2, width: 2 },
    shadowColor: COLORS.red,
    shadowOpacity: 1,
    shadowRadius: 2,
  },
});
