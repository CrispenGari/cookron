import { ScrollView, Linking, Alert } from "react-native";
import React from "react";
import { AppNavProps } from "../../params";
import SettingsHeader from "../../components/Headers/SettingsHeader";
import { COLORS, KEYS } from "../../constants";
import Label from "../../components/Label/Label";
import SettingItem from "../../components/SettingsItem/SettingsItem";
import { RecipeType, SettingsType } from "../../types";
import { onImpact, store } from "../../utils";
import {
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import {
  useBookmarksStore,
  useSearchHistoryStore,
  useSettingsStore,
} from "../../store";
const Settings: React.FunctionComponent<AppNavProps<"Settings">> = ({
  navigation,
}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: (props) => <SettingsHeader {...props} />,
    });
  }, [navigation]);
  const { settings, setSettings } = useSettingsStore();
  const { history, setSearchHistory } = useSearchHistoryStore();
  const { bookmarks, setBookmarks } = useBookmarksStore();

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
          if (settings.haptics) {
            onImpact();
          }
          const s: SettingsType = {
            haptics: !settings.haptics,
            limit: settings.limit,
            historyEnabled: settings.historyEnabled,
          };
          await store(KEYS.APP_SETTINGS, JSON.stringify(s));
          setSettings(s);
        }}
      />
      <Label title="PERSONALIZATION & HISTORY" />
      <SettingItem
        title={
          !settings.historyEnabled
            ? "Enable Search History"
            : "Disable Search History"
        }
        Icon={
          settings.historyEnabled ? (
            <MaterialIcons
              name="lock-clock"
              size={24}
              color={COLORS.secondary}
            />
          ) : (
            <MaterialCommunityIcons
              name="account-clock"
              size={24}
              color={COLORS.secondary}
            />
          )
        }
        onPress={async () => {
          if (settings.haptics) {
            onImpact();
          }
          const s: SettingsType = {
            haptics: settings.haptics,
            limit: settings.limit,
            historyEnabled: !settings.historyEnabled,
          };
          await store(KEYS.APP_SETTINGS, JSON.stringify(s));
          setSettings(s);
        }}
      />
      <SettingItem
        title="Clear Search History"
        disabled={history.length === 0}
        Icon={
          <MaterialIcons name="clear-all" size={24} color={COLORS.secondary} />
        }
        onPress={async () => {
          if (settings.haptics) {
            onImpact();
          }
          Alert.alert(
            "cookron",
            `Are you sure you want to clear ${history.length} items in your search history?`,
            [
              {
                text: "Clear All",
                style: "destructive",
                onPress: async () => {
                  const payload: RecipeType[] = [];
                  await store(KEYS.SEARCH_HISTORY, JSON.stringify(payload));
                  setSearchHistory(payload);
                },
              },
              {
                text: "Cancel",
                style: "cancel",
              },
            ],
            {
              cancelable: false,
            }
          );
        }}
      />

      <SettingItem
        title="Clear Bookmarks"
        disabled={bookmarks.length === 0}
        Icon={
          <Ionicons
            name="heart-dislike-outline"
            size={24}
            color={COLORS.secondary}
          />
        }
        onPress={() => {
          if (settings.haptics) {
            onImpact();
          }
          Alert.alert(
            "cookron",
            `Are you sure you want to clear ${bookmarks.length} items in your offline recipes/bookmarks/favorites? Note that by clearing this we won't be able to accurately recommend new recipes as per your interest.`,
            [
              {
                text: "Clear All",
                style: "destructive",
                onPress: async () => {
                  const payload: RecipeType[] = [];
                  await store(KEYS.BOOK_MARKS, JSON.stringify(payload));
                  setBookmarks(payload);
                },
              },
              {
                text: "Cancel",
                style: "cancel",
              },
            ],
            {
              cancelable: false,
            }
          );
        }}
      />
      <Label title="ISSUES & BUGS" />
      <SettingItem
        title="Report an Issue"
        Icon={<Entypo name="bug" size={24} color={COLORS.secondary} />}
        onPress={async () => {
          if (settings.haptics) {
            onImpact();
          }
          await Linking.openURL(
            "https://github.com/CrispenGari/cookron/issues"
          );
        }}
      />
    </ScrollView>
  );
};

export default Settings;
