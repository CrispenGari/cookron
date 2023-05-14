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
import { StackNavigationProp } from "@react-navigation/stack";
import { AppParamList } from "../../params";
import { KEYS } from "../../constants";
import { retrieve } from "../../utils";

interface Props {
  navigation: StackNavigationProp<AppParamList, "Home">;
  onMomentumScrollBegin: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onMomentumScrollEnd: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
}
const Favorites: React.FunctionComponent<Props> = ({
  onMomentumScrollBegin,
  onMomentumScrollEnd,
  navigation,
}) => {
  const [recipes, setRecipes] = React.useState<RecipeType[]>([]);
  React.useEffect(() => {
    (async () => {
      const res = await retrieve(KEYS.BOOK_MARKS);
      const data: Array<RecipeType> = res ? JSON.parse(res) : [];
      setRecipes(data);
    })();
  }, []);
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
        FAVORITES
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
