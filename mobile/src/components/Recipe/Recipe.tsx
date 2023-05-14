import { Text, TouchableOpacity, Image, View } from "react-native";
import React from "react";
import type { RecipeType } from "../../types";
import { styles } from "../../styles";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import Ratting from "../Ratting/Ratting";
import { onImpact } from "../../utils";
import { COLORS } from "../../constants";
import ContentLoader from "../ContentLoader/ContentLoader";

interface Props {
  recipe: RecipeType;
  index: number;
}
const Recipe: React.FunctionComponent<Props> = ({ recipe, index }) => {
  const {
    dimension: { width },
  } = useMediaQuery();
  const [loaded, setLoaded] = React.useState<boolean>(false);
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        onImpact();
      }}
      style={{
        margin: 5,
        minWidth: width <= 600 ? 150 : 200,
        flex: 1,
        maxWidth: width <= 600 ? 150 : 200,
      }}
    >
      <Text style={[styles.h1, {}]}>{recipe.name}</Text>
      <Text style={[styles.p, { fontSize: 14, color: "gray" }]}>
        {recipe.author} • {recipe.dish_type} • {recipe.difficult}
      </Text>
      <ContentLoader
        style={{
          height: 100,
          borderRadius: 5,
          backgroundColor: COLORS.secondary,
          marginBottom: 2,
          display: !loaded ? "flex" : "none",
        }}
      />
      <Image
        source={{
          uri: recipe.image,
        }}
        onLoad={() => setLoaded(true)}
        style={{
          width: "100%",
          height: loaded ? 100 : 1,
        }}
      />
      <Ratting value={recipe.rattings} max={5} />
      <Text style={[styles.p]} numberOfLines={1}>
        {recipe.description}
      </Text>
    </TouchableOpacity>
  );
};

export default Recipe;
