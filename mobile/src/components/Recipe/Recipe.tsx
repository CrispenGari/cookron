import { Text, TouchableOpacity, Image, View } from "react-native";
import React from "react";
import type { RecipeType } from "../../types";
import { styles } from "../../styles";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import Ratting from "../Ratting/Ratting";
import Skeleton from "../skeletons/Skeleton/Skeleton";
import Animations from "../skeletons/Animation/Animation";
import { onImpact } from "../../utils";

interface Props {
  recipe: RecipeType;
}
const Recipe: React.FunctionComponent<Props> = ({ recipe }) => {
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
      <View style={{ overflow: "hidden", display: !loaded ? "flex" : "none" }}>
        <Skeleton type="image" />
        <Animations />
      </View>
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
