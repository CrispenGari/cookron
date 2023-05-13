import React from "react";
import { StyleSheet, View } from "react-native";
import { COLORS } from "../../../constants";

const Skeleton: React.FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case "h1":
      return (
        <View
          style={{
            width: "100%",
            height: 8,
            backgroundColor: COLORS.secondary,
            marginBottom: 2,
            borderRadius: 2,
          }}
        />
      );

    case "h2":
      return (
        <View
          style={{
            width: "50%",
            height: 8,
            backgroundColor: COLORS.secondary,
            marginBottom: 2,
            borderRadius: 2,
          }}
        />
      );
    case "image":
      return (
        <View
          style={{
            height: 100,
            marginBottom: 5,
            backgroundColor: COLORS.secondary,
            borderRadius: 5,
          }}
        />
      );

    case "p":
      return (
        <View
          style={{
            width: "100%",
            height: 6,
            marginBottom: 2,
            backgroundColor: COLORS.secondary,
            borderRadius: 2,
          }}
        />
      );
    case "ratings":
      return (
        <View
          style={{
            height: 10,
            borderRadius: 999,
            width: "40%",
            marginBottom: 2,
            backgroundColor: COLORS.secondary,
          }}
        />
      );

    default:
      return <View />;
  }
};

export default Skeleton;
