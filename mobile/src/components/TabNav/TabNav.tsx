import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Tab from "./Tab";
const TAB_BAR_HEIGHT: number = 40;
const TAB_BAR_WIDTH: number = 150;
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../constants";

interface Props {
  setState: React.Dispatch<
    React.SetStateAction<{
      selectedTab: number;
    }>
  >;
  state: {
    selectedTab: number;
  };
  selectTab: (index: number) => void;
}
const TabNav: React.FunctionComponent<Props> = ({ state, selectTab }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: 20,
        height: TAB_BAR_HEIGHT,
        width: TAB_BAR_WIDTH,
        marginHorizontal: 15,
        backgroundColor: COLORS.tertiary,
        overflow: "hidden",
        borderRadius: 40,
        alignSelf: "center",
      }}
    >
      {state.selectedTab === 0 ? (
        <View
          style={[
            {
              position: "absolute",
              height: TAB_BAR_HEIGHT,
              width: TAB_BAR_WIDTH / 2,
              backgroundColor: COLORS.primary,
              left: 0,
            },
          ]}
        />
      ) : (
        <View
          style={[
            {
              position: "absolute",
              height: TAB_BAR_HEIGHT,
              width: TAB_BAR_WIDTH / 2,
              backgroundColor: COLORS.primary,
              right: 0,
            },
          ]}
        />
      )}
      <TouchableOpacity style={{ flex: 1 }} onPress={() => selectTab(0)}>
        <Tab
          Icon={
            <Ionicons
              name="md-fast-food-outline"
              size={24}
              color={state.selectedTab !== 0 ? "white" : "black"}
            />
          }
        />
      </TouchableOpacity>
      <TouchableOpacity style={{ flex: 1 }} onPress={() => selectTab(1)}>
        <Tab
          Icon={
            <MaterialIcons
              name="favorite-border"
              size={24}
              color={state.selectedTab !== 1 ? "white" : "black"}
            />
          }
        />
      </TouchableOpacity>
    </View>
  );
};

export default TabNav;
