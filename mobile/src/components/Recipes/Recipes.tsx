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
interface Props {
  recipes: RecipeType[];
  onMomentumScrollBegin: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onMomentumScrollEnd: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
}
const Recipes: React.FunctionComponent<Props> = ({
  recipes,
  onMomentumScrollBegin,
  onMomentumScrollEnd,
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
      >
        {recipes.map((recipe) => (
          <Recipe recipe={recipe} key={recipe.id} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Recipes;
