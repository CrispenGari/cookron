import {
  View,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import React from "react";
import { RecipeType } from "../../types";
import Recipe from "../Recipe/Recipe";
import RippleLoadingIndicator from "../RippleLoadingIndicator/RippleLoadingIndicator";
import { COLORS } from "../../constants";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppParamList } from "../../params";

interface Props {
  recipes: RecipeType[];
  isLoading: boolean;
  navigation: StackNavigationProp<AppParamList, "Home">;
  fetchNextPageData: () => void;
  hasNextPage: boolean;
  onMomentumScrollBegin: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onMomentumScrollEnd: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
}
const Recipes: React.FunctionComponent<Props> = ({
  recipes,
  onMomentumScrollBegin,
  onMomentumScrollEnd,
  isLoading,
  fetchNextPageData,
  navigation,
  hasNextPage,
}) => {
  return (
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
      onScroll={({ nativeEvent }) => {
        const isAtEnd =
          (
            nativeEvent.contentOffset.y + nativeEvent.layoutMeasurement.height
          ).toFixed(0) === nativeEvent.contentSize.height.toFixed(0);
        if (isAtEnd && hasNextPage) {
          fetchNextPageData();
        }
      }}
    >
      {recipes.map((recipe, index) => (
        <Recipe
          cardType="regular"
          recipe={recipe}
          key={recipe.id}
          navigation={navigation}
        />
      ))}
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          height: 100,
        }}
      >
        {isLoading ? (
          <RippleLoadingIndicator color={COLORS.secondary} size={20} />
        ) : null}
      </View>
    </ScrollView>
  );
};

export default Recipes;
