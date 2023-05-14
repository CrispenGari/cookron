import { View, Text, ScrollView } from "react-native";
import React from "react";
import { AppNavProps } from "../../params";
import { COLORS, KEYS } from "../../constants";
import { RecipeType } from "../../types";
import { retrieve } from "../../utils";
import Recipe from "../../components/Recipe/Recipe";
import FavoritesHeader from "../../components/Headers/FavoritesHeader";

const Favorites: React.FunctionComponent<AppNavProps<"Favorites">> = ({
  navigation,
}) => {
  const [recipes, setRecipes] = React.useState<RecipeType[]>([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: (props) => <FavoritesHeader {...props} />,
    });
  }, [navigation]);

  React.useEffect(() => {
    (async () => {
      const res = await retrieve(KEYS.BOOK_MARKS);
      const data: Array<RecipeType> = res ? JSON.parse(res) : [];
      setRecipes(data);
    })();
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.main }}>
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
      >
        {recipes.map((recipe, index) => (
          <Recipe
            recipe={recipe}
            key={recipe.id}
            index={index}
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
        />
      </ScrollView>
    </View>
  );
};

export default Favorites;
