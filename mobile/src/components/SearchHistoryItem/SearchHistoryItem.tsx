import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { RecipeType } from "../../types";
import { MaterialIcons } from "@expo/vector-icons";
const SearchHistoryItem: React.FunctionComponent<{
  history: RecipeType;
}> = () => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      activeOpacity={0.7}
    >
      <View style={{ flex: 1 }}>
        <Text style={{}}>SearchHistoryItem</Text>
      </View>
      <MaterialIcons name="history" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default SearchHistoryItem;
