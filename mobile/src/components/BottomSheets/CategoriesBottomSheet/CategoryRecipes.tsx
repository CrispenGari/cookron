import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { View, Keyboard, TouchableOpacity, TextInput } from "react-native";
import * as Animatable from "react-native-animatable";
import { AppParamList } from "../../../params";
import { MainCategoryType } from "../../../types";
import CategoryAllRecipes from "./CategoryAllRecipes";
import { COLORS, FONTS } from "../../../constants";
import { useDebounce, useMediaQuery } from "../../../hooks";
import { Ionicons } from "@expo/vector-icons";
import CategoryFilteredRecipes from "./CategoryFilteredRecipes";
export const CategoryRecipes: React.FunctionComponent<{
  category: MainCategoryType;
  toggle: () => void;
  navigation: StackNavigationProp<AppParamList, "Home">;
  onMomentumScrollBegin: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onMomentumScrollEnd: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
}> = (props) => {
  const [term, setTerm] = React.useState("");
  const [focused, setFocused] = React.useState<boolean>(false);
  const [openSearch, setOpenSearch] = React.useState<boolean>(false);
  const searchTerm = useDebounce(term, 1000);
  const {
    dimension: { width },
  } = useMediaQuery();
  return (
    <View style={{ flex: 1 }}>
      <Animatable.View
        animation="slideInRight"
        duration={500}
        style={{
          backgroundColor: COLORS.primary,
          flexDirection: "row",
          padding: 5,
          alignItems: "center",
          marginHorizontal: 10,
          borderRadius: 999,
          paddingHorizontal: 10,
          maxWidth: 500,
          marginVertical: 5,
          alignSelf: width >= 600 ? "flex-end" : "center",
        }}
      >
        <Animatable.View
          animation={focused ? "fadeInLeft" : "fadeInRight"}
          duration={400}
        >
          <TouchableOpacity
            onPress={() => {
              if (focused) {
                setTerm("");
                setOpenSearch(false);
                Keyboard.dismiss();
              }
            }}
            activeOpacity={0.7}
          >
            {focused ? (
              <Ionicons
                name="arrow-back-outline"
                size={24}
                color={COLORS.tertiary}
              />
            ) : (
              <Ionicons name="search-sharp" size={24} color={COLORS.tertiary} />
            )}
          </TouchableOpacity>
        </Animatable.View>
        <TextInput
          placeholder={`Search Recipes, Dishes, Food, etc. in ${props.category} `}
          value={term}
          placeholderTextColor={COLORS.tertiary}
          onChangeText={(text) => setTerm(text)}
          style={{
            fontSize: width > 600 ? 20 : 16,
            marginLeft: 15,
            flex: 1,
            fontFamily: FONTS.regular,
          }}
          onBlur={() => {
            setFocused(false);
          }}
          onFocus={() => {
            setFocused(true);
            setOpenSearch(true);
          }}
        />
      </Animatable.View>
      {openSearch ? (
        <CategoryFilteredRecipes {...props} searchTerm={searchTerm} />
      ) : (
        <CategoryAllRecipes {...props} />
      )}
    </View>
  );
};
