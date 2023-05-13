import { View, Text, ScrollView } from "react-native";
import React from "react";
import { MainCategoryType, Recipe as T } from "../../types";
import { styles } from "../../styles";
import Recipe from "../Recipe/Recipe";

interface Props {
  recipes: T[];
  category: MainCategoryType;
}
const Categories: React.FunctionComponent<Props> = ({ recipes, category }) => {
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
        {category.toUpperCase()}
      </Text>
      <ScrollView
        style={{ flex: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          {recipes.map((recipe) => (
            <Recipe key={recipe.id} recipe={recipe} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Categories;
