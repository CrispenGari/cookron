import React from "react";
import { View } from "react-native";

const Tab: React.FC<{
  Icon: React.ReactNode;
}> = ({ Icon }) => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    {Icon}
  </View>
);
export default Tab;
