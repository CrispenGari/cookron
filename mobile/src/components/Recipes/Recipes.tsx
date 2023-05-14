import {
  View,
  Text,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import React from "react";
import { RecipeType } from "../../types";
import { styles } from "../../styles";
import Recipe from "../Recipe/Recipe";
import RippleLoadingIndicator from "../RippleLoadingIndicator/RippleLoadingIndicator";
import { COLORS } from "../../constants";

interface Props {
  recipes: RecipeType[];
  isLoading: boolean;
  fetchNextPageData: () => void;
  onMomentumScrollBegin: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onMomentumScrollEnd: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
}
const Recipes: React.FunctionComponent<Props> = ({
  recipes,
  onMomentumScrollBegin,
  onMomentumScrollEnd,
  isLoading,
  fetchNextPageData,
}) => {
  return (
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
          if (isAtEnd) {
            fetchNextPageData();
          }
        }}
      >
        {recipes.map((recipe, index) => (
          <Recipe recipe={recipe} key={recipe.id} index={index} />
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
    </View>
  );
};

export default Recipes;
