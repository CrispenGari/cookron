import { View, Text } from "react-native";
import { styles } from "../../../styles";
import { MainCategoryType } from "../../../types";

export const CategoriesTab: React.FunctionComponent<{
  title: MainCategoryType;
  Icon: React.ReactNode;
  active: boolean;
}> = ({ title, Icon, active }) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {Icon}
      <Text
        style={[styles.p, { fontSize: 14, color: active ? "white" : "black" }]}
      >
        {title}
      </Text>
    </View>
  );
};
