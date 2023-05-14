import {
  View,
  Text,
  ScrollView,
  Image,
  ViewStyle,
  StyleProp,
  Linking,
} from "react-native";
import React from "react";
import { AppNavProps } from "../../params";
import { RecipeType } from "../../types";
import RecipeHeader from "../../components/Headers/RecipeHeader";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { COLORS } from "../../constants";
import Ratting from "../../components/Ratting/Ratting";
import { styles } from "../../styles";
import { TouchableOpacity } from "react-native-gesture-handler";

const Recipe: React.FunctionComponent<AppNavProps<"Recipe">> = ({
  navigation,
  route,
}) => {
  const recipe = JSON.parse(route.params.recipe) as RecipeType;

  const {
    dimension: { width, height },
  } = useMediaQuery();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: (props) => <RecipeHeader {...props} recipe={recipe} />,
    });
  }, [navigation, recipe]);

  return (
    <ScrollView
      scrollEventThrottle={16}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        padding: 10,
        flexDirection: width >= 600 ? "row" : "column",
        paddingBottom: 100,
      }}
      style={{ flex: 1, backgroundColor: COLORS.main }}
    >
      <View
        style={{
          width: "100%",
          flex: 1,
          maxWidth: width >= 600 ? 400 : "100%",
        }}
      >
        <Image
          source={{ uri: recipe.image }}
          style={{
            width: "100%",
            height: 300,
            borderRadius: 10,
            marginBottom: 10,
          }}
        />
        <Text style={[styles.h1, { fontSize: 20 }]}>{recipe.name}</Text>
        <Text style={[styles.p, { fontSize: 14, color: "gray" }]}>
          {recipe.author} • {recipe.dish_type} • {recipe.difficult}
        </Text>
        <Ratting max={5} value={recipe.rattings} />
        <Text style={[styles.p]}>{recipe.description}</Text>
        <Badge label={recipe.difficult} />

        <Text style={[styles.h1, { fontSize: 20 }]}>Ingredients</Text>
        {recipe.ingredients.map((ingredient, index) => (
          <Text key={index} style={[styles.p, {}]}>
            • {ingredient}
          </Text>
        ))}
        <Text style={[styles.h1, { fontSize: 16, marginTop: 10 }]}>Serves</Text>
        <Text style={[styles.p, {}]}>• {recipe.serves} people</Text>
      </View>
      <View
        style={{
          flex: 1,
          marginLeft: width >= 600 ? 10 : 0,
          marginTop: width >= 600 ? 0 : 10,
        }}
      >
        <Text style={[styles.h1, { fontSize: 20 }]}>
          How to cook {recipe.name}.
        </Text>
        {recipe.steps.map((step, index) => (
          <Text key={index} style={[styles.p, { marginTop: 10 }]}>
            • {step}
          </Text>
        ))}
        <Text style={[styles.h1, { marginTop: 10, fontSize: 16 }]}>
          About time.
        </Text>
        {Object.entries(recipe.times).map(([key, value], index) => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={[styles.p, { marginRight: 10 }]}>{key}</Text>
            <Badge label={value} color={COLORS.secondary} />
          </View>
        ))}
        <Text style={[styles.h1, { marginTop: 10, fontSize: 16 }]}>
          Recipe Author
        </Text>
        <Text style={[styles.p, {}]}>• {recipe.author}</Text>
        <Text style={[styles.h1, { fontSize: 16, marginTop: 10 }]}>
          Nutrients Information
        </Text>
        {Object.entries(recipe.nutrients).map(([key, value], index) => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={[styles.p, { marginRight: 10 }]}>• {key}</Text>
            <Badge
              label={value as string}
              color={COLORS.secondary}
              style={{ paddingVertical: 1 }}
            />
          </View>
        ))}
        <Text style={[styles.h1, { fontSize: 16, marginTop: 10 }]}>
          Recipe Category Information.
        </Text>
        <Text
          style={[styles.p, { textTransform: "capitalize", color: "gray" }]}
        >
          {recipe.maincategory} • {recipe.subcategory} • {recipe.dish_type}
        </Text>
        <Text style={[styles.h1, { fontSize: 16, marginTop: 10 }]}>
          I want to learn More?
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            Linking.openURL(recipe.url);
          }}
        >
          <Text
            style={[
              styles.p,
              { textTransform: "capitalize", color: COLORS.url },
            ]}
          >
            • READ MORE
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Recipe;

const Badge: React.FunctionComponent<{
  style?: StyleProp<ViewStyle>;
  label: string;
  color?: string;
}> = ({ label, color, style }) => {
  return (
    <View
      style={[
        {
          backgroundColor: color ? color : COLORS.red,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
          borderRadius: 999,
          paddingVertical: 3,
          marginVertical: 5,
          maxWidth: 100,
        },
        style,
      ]}
    >
      <Text style={[styles.p, { color: COLORS.white }]}>{label}</Text>
    </View>
  );
};
