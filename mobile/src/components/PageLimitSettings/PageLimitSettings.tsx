import { View } from "react-native";
import React from "react";
import { COLORS, FONTS, KEYS } from "../../constants";
import { useSettingsStore } from "../../store";
import DropdownSelect from "react-native-input-select";
import { store } from "../../utils";
import { SettingsType } from "../../types";
const PageLimitSettings: React.FunctionComponent<{}> = ({}) => {
  const { settings, setSettings } = useSettingsStore((s) => s);
  return (
    <View style={{ padding: 10 }}>
      <DropdownSelect
        modalOptionsContainerStyle={{ backgroundColor: COLORS.main }}
        label={`Current Limit (${settings.limit})`}
        placeholder={settings.limit.toString()}
        options={[11, 21, 31, 41, 51, 61, 71, 81, 91, 101].map((v) => ({
          value: v,
          id: v,
        }))}
        optionLabel={"value"}
        optionValue={"id"}
        selectedValue={settings.limit.toString()}
        onValueChange={async (item: string) => {
          const s: SettingsType = {
            haptics: settings.haptics,
            limit: Number.parseInt(item),
          };
          await store(KEYS.APP_SETTINGS, JSON.stringify(s));
          setSettings(s);
        }}
        isMultiple={false}
        dropdownStyle={{
          borderWidth: 0.5,
          backgroundColor: COLORS.main,
          height: 50,
          minHeight: 0,
          maxWidth: 300,
          padding: 0,
          margin: 0,
        }}
        placeholderStyle={{
          fontFamily: FONTS.regularBold,
          color: "black",
          margin: 0,
        }}
        labelStyle={{ fontFamily: FONTS.regular, marginBottom: 0 }}
        dropdownHelperTextStyle={{
          color: COLORS.red,
          fontFamily: FONTS.regular,
          fontSize: 12,
          marginTop: 0,
        }}
        modalBackgroundStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        helperText="Select page limit which is a number between 10 and 102 exclusive."
        checkboxSize={10}
        checkboxStyle={{
          backgroundColor: COLORS.tertiary,
        }}
        dropdownIconStyle={{ display: "none" }}
        selectedItemStyle={{ fontFamily: FONTS.regularBold, margin: 0 }}
        checkboxLabelStyle={{ fontFamily: FONTS.regularBold, fontSize: 20 }}
      />
    </View>
  );
};

export default PageLimitSettings;
