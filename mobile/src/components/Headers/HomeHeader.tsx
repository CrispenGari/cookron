import {
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React from "react";
import { COLORS, FONTS } from "../../constants";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../../styles";
import { useMediaQuery } from "../../hooks/useMediaQuery";

interface Props {
  term: string;
  setTerm: React.Dispatch<React.SetStateAction<string>>;
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
}
const HomeHeader: React.FunctionComponent<Props> = ({
  term,
  setTerm,
  setOpenSearch,
}) => {
  const [focused, setFocused] = React.useState<boolean>(false);

  const {
    dimension: { width },
  } = useMediaQuery();
  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.secondary,
        height: width > 600 ? 100 : 130,
        justifyContent: width > 600 ? "space-between" : "center",
        flexDirection: width > 600 ? "row" : "column",
        alignItems: "center",
        paddingHorizontal: 10,
      }}
    >
      <Text
        style={[
          styles.h1,
          {
            fontSize: 25,
            letterSpacing: 1,
            marginHorizontal: 10,
            marginBottom: width > 600 ? 0 : 10,
          },
        ]}
      >
        cookron
      </Text>
      <Animatable.View
        animation="slideInRight"
        duration={500}
        style={{
          backgroundColor: COLORS.main,
          flexDirection: "row",
          padding: 5,
          alignItems: "center",
          marginHorizontal: 10,
          borderRadius: 5,
          paddingHorizontal: 10,
          flex: width > 600 ? 1 : 0,
          maxWidth: 500,
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
          placeholder="Search Recipes, Dishes, Food, etc."
          value={term}
          onChangeText={(text) => setTerm(text)}
          style={{
            fontSize: width > 600 ? 24 : 20,
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
    </SafeAreaView>
  );
};

export default HomeHeader;
