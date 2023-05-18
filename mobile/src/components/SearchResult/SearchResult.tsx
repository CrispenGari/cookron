import { Text, TouchableOpacity, Image, View } from "react-native";
import React from "react";
import type { RecipeType } from "../../types";
import { styles } from "../../styles";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import Ratting from "../Ratting/Ratting";
import { onImpact, store } from "../../utils";
import { COLORS, KEYS } from "../../constants";
import ContentLoader from "../ContentLoader/ContentLoader";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppParamList } from "../../params";
import { useSearchHistoryStore, useSettingsStore } from "../../store";

interface Props {
  recipe: RecipeType;
  navigation: StackNavigationProp<AppParamList, "Home" | "Favorites">;
  toggle?: () => void;
}
const SearchResult: React.FunctionComponent<Props> = ({
  recipe,
  navigation,
  toggle,
}) => {
  const {
    dimension: { width },
  } = useMediaQuery();
  const {
    settings: { haptics, historyEnabled },
  } = useSettingsStore();
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const { setSearchHistory, history } = useSearchHistoryStore();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={async () => {
        if (haptics) {
          onImpact();
        }

        if (typeof toggle !== "undefined") {
          toggle();
        }

        if (historyEnabled) {
          // add the recipe to the search history
          const recipes = [
            recipe,
            ...history.filter((r) => r.id !== recipe.id),
          ];
          setSearchHistory(recipes);
          await store(KEYS.SEARCH_HISTORY, JSON.stringify(recipes));
        }
        navigation.navigate("Recipe", {
          recipe: JSON.stringify(recipe),
        });
      }}
      style={{
        margin: 5,
        minWidth: width <= 600 ? 150 : 200,
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
      }}
    >
      <View style={{ width: 80 }}>
        <ContentLoader
          style={{
            height: 50,
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
            height: loaded ? 50 : 1,
          }}
        />
        <Ratting size="small" value={recipe.rattings} max={5} />
      </View>

      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={[styles.h1, {}]}>{recipe.name}</Text>
        <Text style={[styles.p, { fontSize: 14, color: "gray" }]}>
          {recipe.author} • {recipe.dish_type} • {recipe.difficult}
        </Text>

        <Text style={[styles.p]} numberOfLines={1}>
          {recipe.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SearchResult;
