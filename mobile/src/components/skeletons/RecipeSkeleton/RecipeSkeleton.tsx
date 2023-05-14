import { View } from "react-native";
import React from "react";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { COLORS } from "../../../constants";
import ContentLoader from "../../ContentLoader/ContentLoader";
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
      <ContentLoader
        style={{
          width: "100%",
          height: 10,
          borderRadius: 5,
          backgroundColor: COLORS.secondary,
          marginBottom: 2,
        }}
      />
      <ContentLoader
        style={{
          width: "70%",
          height: 10,
          borderRadius: 5,
          backgroundColor: COLORS.secondary,
          marginBottom: 2,
        }}
      />
      <ContentLoader
        style={{
          width: "100%",
          height: 6,
          borderRadius: 5,
          backgroundColor: COLORS.secondary,
          marginBottom: 2,
        }}
      />
      <ContentLoader
        style={{
          height: 100,
          borderRadius: 5,
          backgroundColor: COLORS.secondary,
          marginBottom: 2,
        }}
      />
      <ContentLoader
        style={{
          height: 10,
          borderRadius: 999,
          width: "40%",
          marginBottom: 2,
          backgroundColor: COLORS.secondary,
        }}
      />
      <ContentLoader
        style={{
          width: "100%",
          height: 6,
          borderRadius: 5,
          backgroundColor: COLORS.secondary,
          marginBottom: 2,
        }}
      />
    </View>
  );
};

export default RecipeSkeleton;
