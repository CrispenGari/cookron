import { View, Text } from "react-native";
import { styles } from "../../../styles";
import { MainCategoryType } from "../../../types";
import { usePlatform } from "../../../hooks";

export const CategoriesTab: React.FunctionComponent<{
  title: MainCategoryType;
  Icon: React.ReactNode;
  active: boolean;
}> = ({ title, Icon, active }) => {
  const { os } = usePlatform();
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {Icon}
      <Text
        style={[
          styles.p,
          {
            fontSize: os === "ios" ? 14 : 12,
            color: active ? "white" : "black",
          },
        ]}
      >
        {title}
      </Text>
    </View>
  );
};
