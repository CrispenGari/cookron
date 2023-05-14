import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../../../constants";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { styles } from "../../../styles";
import { onImpact } from "../../../utils";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppParamList } from "../../../params";
export const CategoriesTopHeader: React.FunctionComponent<{
  navigation: StackNavigationProp<AppParamList, "Home">;
  toggle: () => void;
}> = ({ navigation, toggle }) => {
  return (
    <SafeAreaView
      style={{
        height: 100,
      }}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={{ alignItems: "center" }}
          activeOpacity={0.7}
          onPress={() => {
            onImpact();
            toggle();
            navigation.navigate("Favorites");
          }}
        >
          <MaterialIcons
            name="favorite-border"
            size={24}
            color={COLORS.white}
          />
          <Text style={[styles.p, { color: COLORS.white, fontSize: 15 }]}>
            favorites
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          activeOpacity={0.7}
          onPress={() => {
            onImpact();
            toggle();
            navigation.navigate("Settings");
          }}
        >
          <AntDesign name="setting" size={24} color={COLORS.white} />
          <Text style={[styles.p, { color: COLORS.white, fontSize: 15 }]}>
            settings
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
