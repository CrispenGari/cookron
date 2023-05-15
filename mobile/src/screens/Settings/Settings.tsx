import { ScrollView, Linking } from "react-native";
import React from "react";
import { AppNavProps } from "../../params";
import SettingsHeader from "../../components/Headers/SettingsHeader";
import { COLORS, KEYS } from "../../constants";
import Label from "../../components/Label/Label";
import SettingItem from "../../components/SettingsItem/SettingsItem";
import { SettingsType } from "../../types";
import { store } from "../../utils";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { useSettingsStore } from "../../store";

const Settings: React.FunctionComponent<AppNavProps<"Settings">> = ({
  navigation,
}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: (props) => <SettingsHeader {...props} />,
    });
  }, [navigation]);
  const { settings, setSettings } = useSettingsStore((s) => s);

  console.log({ settings });
  return (
    <ScrollView style={{ backgroundColor: COLORS.main, flex: 1 }}>
      <Label title="MISC" />
      <SettingItem
        title={settings.haptics ? "Disable Haptics" : "Enable Haptics"}
        Icon={
          settings.haptics ? (
            <MaterialCommunityIcons
              name="vibrate"
              size={24}
              color={COLORS.secondary}
            />
          ) : (
            <MaterialCommunityIcons
              name="vibrate-off"
              size={24}
              color={COLORS.secondary}
            />
          )
        }
        onPress={async () => {
          const s: SettingsType = {
            haptics: !settings.haptics,
            limit: settings.limit,
          };
          await store(KEYS.APP_SETTINGS, JSON.stringify(settings));
          setSettings(s);
        }}
      />
      <Label title="ISSUES & BUGS" />
      <SettingItem
        title="Report an Issue"
        Icon={<Entypo name="bug" size={24} color={COLORS.secondary} />}
        onPress={async () => {
          await Linking.openURL(
            "https://github.com/CrispenGari/cookron/issues"
          );
        }}
      />
    </ScrollView>
  );
};

export default Settings;
