import { Text, TouchableOpacity, Image, View } from "react-native";
import React, { memo } from "react";
import type { RecipeType } from "../../types";
import { styles } from "../../styles";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import Ratting from "../Ratting/Ratting";
import { onImpact } from "../../utils";
import { COLORS } from "../../constants";
import ContentLoader from "../ContentLoader/ContentLoader";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppParamList } from "../../params";

interface Props {
  recipe: RecipeType;
  navigation: StackNavigationProp<AppParamList, "Home" | "Favorites">;
  toggle?: () => void;
  cardType: "recommentation" | "regular";
}
const Recipe: React.FunctionComponent<Props> = ({
  recipe,
  navigation,
  toggle,
  cardType,
}) => {
  const {
    dimension: { width },
  } = useMediaQuery();
  const [loaded, setLoaded] = React.useState<boolean>(false);
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        onImpact();
        if (typeof toggle !== "undefined") {
          toggle();
        }
        navigation.navigate("Recipe", {
          recipe: JSON.stringify(recipe),
        });
      }}
      style={{
        margin: 5,
        minWidth: width <= 600 ? 150 : 200,
        flex: 1,
        maxWidth: cardType === "recommentation" ? 200 : 500,
      }}
    >
      <Text
        numberOfLines={cardType === "recommentation" ? 1 : 2}
        style={[styles.h1, {}]}
      >
        {recipe.name}
      </Text>
      <Text
        numberOfLines={cardType === "recommentation" ? 1 : 2}
        style={[styles.p, { fontSize: 14, color: "gray" }]}
      >
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
      {cardType === "regular" ? (
        <Text style={[styles.p]} numberOfLines={1}>
          {recipe.description}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};

export default memo(Recipe);
