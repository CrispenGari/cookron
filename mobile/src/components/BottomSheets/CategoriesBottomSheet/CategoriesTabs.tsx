import React from "react";
import { View, TouchableOpacity } from "react-native";
import { COLORS } from "../../../constants";
import { CategoriesTab } from "./CategoriesTab";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { MainCategoryType } from "../../../types";
import { onImpact } from "../../../utils";
import { useSettingsStore } from "../../../store";
const TAB_BAR_HEIGHT: number = 40;
const TAB_BAR_WIDTH: number = 300;
export const CategoriesTabs: React.FunctionComponent<{
  setTab: React.Dispatch<React.SetStateAction<MainCategoryType>>;
  tab: MainCategoryType;
}> = ({ setTab, tab }) => {
  const {
    settings: { haptics },
  } = useSettingsStore();

  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: 25,
        backgroundColor: COLORS.primary,
        borderRadius: 999,
        width: TAB_BAR_WIDTH,
        alignSelf: "center",
        paddingHorizontal: 10,
        overflow: "hidden",
        paddingVertical: 2,
        height: TAB_BAR_HEIGHT,
      }}
    >
      <ActiveTabIndicator
        tabNumber={[
          "recipes",
          "baking",
          "budget",
          "health",
          "inspiration",
        ].indexOf(tab)}
      />
      <TouchableOpacity
        style={{ flex: 1 }}
        activeOpacity={0.7}
        onPress={() => {
          if (haptics) {
            onImpact();
          }

          setTab("recipes");
        }}
      >
        <CategoriesTab
          active={tab === "recipes"}
          title="recipes"
          Icon={
            <Ionicons
              name="fast-food-outline"
              size={16}
              color={tab === "recipes" ? "white" : "black"}
            />
          }
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flex: 1 }}
        activeOpacity={0.7}
        onPress={() => {
          if (haptics) {
            onImpact();
          }

          setTab("baking");
        }}
      >
        <CategoriesTab
          title="baking"
          active={tab === "baking"}
          Icon={
            <MaterialCommunityIcons
              name="bread-slice"
              size={16}
              color={tab === "baking" ? "white" : "black"}
            />
          }
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flex: 1 }}
        activeOpacity={0.7}
        onPress={() => {
          if (haptics) {
            onImpact();
          }

          setTab("budget");
        }}
      >
        <CategoriesTab
          title="budget"
          active={tab === "budget"}
          Icon={
            <MaterialCommunityIcons
              name="food-fork-drink"
              size={16}
              color={tab === "budget" ? "white" : "black"}
            />
          }
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flex: 1 }}
        activeOpacity={0.7}
        onPress={() => {
          if (haptics) {
            onImpact();
          }

          setTab("health");
        }}
      >
        <CategoriesTab
          title="health"
          active={tab === "health"}
          Icon={
            <MaterialCommunityIcons
              name="food-off-outline"
              size={16}
              color={tab === "health" ? "white" : "black"}
            />
          }
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flex: 1 }}
        activeOpacity={0.7}
        onPress={() => {
          if (haptics) {
            onImpact();
          }

          setTab("inspiration");
        }}
      >
        <CategoriesTab
          active={tab === "inspiration"}
          title="inspiration"
          Icon={
            <MaterialCommunityIcons
              name="food-turkey"
              size={16}
              color={tab === "inspiration" ? "white" : "black"}
            />
          }
        />
      </TouchableOpacity>
    </View>
  );
};

const ActiveTabIndicator: React.FunctionComponent<{
  tabNumber: number;
}> = ({ tabNumber }) => {
  if (tabNumber === 3) {
    return (
      <View
        style={[
          {
            position: "absolute",
            height: TAB_BAR_HEIGHT,
            width: TAB_BAR_WIDTH / 5,
            backgroundColor: COLORS.tertiary,
            right: TAB_BAR_WIDTH / 5 + 7,
          },
        ]}
      />
    );
  }

  if (tabNumber === 4) {
    return (
      <View
        style={[
          {
            position: "absolute",
            height: TAB_BAR_HEIGHT,
            width: TAB_BAR_WIDTH / 5 + 10,
            backgroundColor: COLORS.tertiary,
            right: 0,
          },
        ]}
      />
    );
  }
  return (
    <View
      style={[
        {
          position: "absolute",
          height: TAB_BAR_HEIGHT,
          width: TAB_BAR_WIDTH / 5,
          backgroundColor: COLORS.tertiary,
          left: (TAB_BAR_WIDTH / 5) * tabNumber,
        },
      ]}
    />
  );
};
