import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../../styles";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { StackHeaderProps } from "@react-navigation/stack";
import { onImpact } from "../../utils";
import { MaterialIcons } from "@expo/vector-icons";
import { useSettingsStore } from "../../store";
const SettingsHeader: React.FunctionComponent<StackHeaderProps> = ({
  navigation,
}) => {
  const {
    settings: { haptics },
  } = useSettingsStore();
  const {
    dimension: { width },
  } = useMediaQuery();
  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.secondary,
        height: width >= 600 ? 80 : 100,
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        flexDirection: "row",
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
        <Text style={[styles.h1, { fontSize: 22 }]}>App Settings</Text>
        <Text style={[styles.p, { fontSize: 14 }]}>your in app settings.</Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={async () => {
          if (haptics) {
            onImpact();
          }

          navigation.navigate("Favorites");
        }}
        style={{ paddingHorizontal: 10 }}
      >
        <MaterialIcons name="favorite-border" size={24} color={COLORS.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SettingsHeader;
