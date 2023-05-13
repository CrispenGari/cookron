import { View, Text } from "react-native";
import React from "react";
import Animation from "../Animation/Animation";
import Skeleton from "../Skeleton/Skeleton";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { COLORS } from "../../../constants";
const RecipeSkeleton = () => {
  const {
    dimension: { width },
  } = useMediaQuery();
  return (
    <View
      style={{
        margin: 5,
        minWidth: width <= 600 ? 150 : 200,
        flex: 1,
        maxWidth: width <= 600 ? 150 : 200,
        overflow: "hidden",
      }}
    >
      <Skeleton type="h1" />
      <Skeleton type="h2" />
      <Skeleton type="p" />
      <Skeleton type="image" />
      <Skeleton type="ratings" />
      <Skeleton type="p" />
      <Animation />
    </View>
  );
};

export default RecipeSkeleton;
