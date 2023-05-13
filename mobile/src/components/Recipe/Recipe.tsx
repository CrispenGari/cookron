import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import type { Recipe as T } from "../../types";
import { styles } from "../../styles";

interface Props {
  recipe: T;
}
const Recipe: React.FunctionComponent<Props> = ({ recipe }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{ margin: 5, minWidth: 150, flex: 1, maxWidth: 150 }}
    >
      <Text style={[styles.h1, {}]}>{recipe.name}</Text>
      <Text style={[styles.p, { fontSize: 14, color: "gray" }]}>
        {recipe.author} • {recipe.dish_type} • {recipe.difficult}
      </Text>
      <Image
        source={{
          uri: recipe.image,
        }}
        style={{
          width: "100%",
          height: 100,
        }}
      />
      <Text style={[styles.p]} numberOfLines={1}>
        {recipe.description}
      </Text>
    </TouchableOpacity>
  );
};

export default Recipe;
