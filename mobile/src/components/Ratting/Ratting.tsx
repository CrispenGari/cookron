import { View, Text } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../constants";

const Ratting: React.FunctionComponent<{
  value: number;
  max: number;
}> = ({ value, max = 5 }) => {
  return (
    <View style={{ flexDirection: "row", marginVertical: 5 }}>
      {Array(max)
        .fill(value)
        .map((v, i) => {
          return (
            <View key={i}>
              {v < i + 1 ? (
                <AntDesign name="staro" size={15} color={COLORS.rating} />
              ) : (
                <AntDesign name="star" size={15} color={COLORS.rating} />
              )}
            </View>
          );
        })}
    </View>
  );
};

export default Ratting;
