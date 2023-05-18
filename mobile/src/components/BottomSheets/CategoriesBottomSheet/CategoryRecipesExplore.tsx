import {
  View,
  Text,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from "react-native";
import React from "react";
import CategoryAllRecipes from "./CategoryAllRecipes";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppParamList } from "../../../params";
import { MainCategoryType, RecipeType, ResponseType } from "../../../types";
import { useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { FONTS, serverBaseURL } from "../../../constants";
import {
  useBookmarksStore,
  useSettingsStore,
  useNetworkStore,
} from "../../../store";
import RecipeSkeleton from "../../skeletons/RecipeSkeleton/RecipeSkeleton";

const CategoryRecipesExplore: React.FunctionComponent<{
  category: MainCategoryType;
  toggle: () => void;
  navigation: StackNavigationProp<AppParamList, "Home">;
  onMomentumScrollBegin: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onMomentumScrollEnd: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
}> = ({
  category,
  navigation,
  onMomentumScrollBegin,
  onMomentumScrollEnd,
  toggle,
}) => {
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontFamily: FONTS.regularBold, marginBottom: 5 }}>
        EXPLORE STUFF UNDER {category.toUpperCase()}
      </Text>
      <CategoryAllRecipes
        onMomentumScrollEnd={onMomentumScrollEnd}
        onMomentumScrollBegin={onMomentumScrollBegin}
        navigation={navigation}
        toggle={toggle}
        category={category}
      />
    </View>
  );
};

export default CategoryRecipesExplore;
