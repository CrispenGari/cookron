import React from "react";
import { View, Text } from "react-native";
import { MainCategoryType } from "../../../types";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { styles } from "../../../styles";
import { COLORS } from "../../../constants";

export const CategoriesHeader: React.FunctionComponent<{
  tab: MainCategoryType;
}> = ({ tab }) => {
  const {
    dimension: { width },
  } = useMediaQuery();
  return (
    <View
      style={{
        backgroundColor: COLORS.secondary,
        position: "absolute",
        top: -10,
        width: 100,
        left: width / 2 - 50,
        borderRadius: 999,
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 2,
        shadowOpacity: 1,
        shadowColor: COLORS.white,
      }}
    >
      <Text
        style={[
          styles.h1,
          {
            textTransform: "uppercase",
          },
        ]}
      >
        {tab}
      </Text>
    </View>
  );
};
