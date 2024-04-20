import {
  View,
  Text,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import React from "react";
import CategoryAllRecipes from "./CategoryAllRecipes";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppParamList } from "../../../params";
import { MainCategoryType } from "../../../types";
import { FONTS } from "../../../constants";

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
