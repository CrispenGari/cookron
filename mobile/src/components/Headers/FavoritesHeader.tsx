import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../../constants";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { StackHeaderProps } from "@react-navigation/stack";
import { styles } from "../../styles";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { onImpact } from "../../utils";
import { useSettingsStore } from "../../store";
const FavoritesHeader: React.FunctionComponent<StackHeaderProps> = ({
  navigation,
}) => {
  const {
    dimension: { width },
  } = useMediaQuery();

  const {
    settings: { haptics },
  } = useSettingsStore();
  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.secondary,
        height: width >= 600 ? 80 : 100,
        justifyContent: "center",
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            if (haptics) {
              onImpact();
            }

            navigation.goBack();
          }}
          style={{ paddingHorizontal: 10 }}
        >
          <Ionicons name="chevron-back" size={24} color={COLORS.main} />
        </TouchableOpacity>
        <View style={{ flex: 1, marginHorizontal: 10 }}>
          <Text style={[styles.h1, { fontSize: 22 }]}>Favorites</Text>
          <Text style={[styles.p, { fontSize: 14 }]}>offline recipes.</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={async () => {
            if (haptics) {
              onImpact();
            }

            navigation.navigate("Settings");
          }}
          style={{ paddingHorizontal: 10 }}
        >
          <AntDesign name="setting" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FavoritesHeader;
