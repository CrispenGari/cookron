import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { RecipeType } from "../../types";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "../../styles";
import { onImpact, store } from "../../utils";
import { Swipeable } from "react-native-gesture-handler";
import { COLORS, KEYS } from "../../constants";
import { useSearchHistoryStore, useSettingsStore } from "../../store";
const SearchHistoryItem: React.FunctionComponent<{
  history: RecipeType;
  setTerm: React.Dispatch<React.SetStateAction<string>>;
}> = ({ history, setTerm }) => {
  const swipeableRef = React.useRef<Swipeable | undefined>();
  const {
    settings: { haptics },
  } = useSettingsStore();
  const { history: searchHistory, setSearchHistory } = useSearchHistoryStore();
  const deleteHistoryItem = async () => {
    if (haptics) {
      onImpact();
    }
    const payload = searchHistory.filter(({ id }) => id !== history.id);
    setSearchHistory(payload);
    await store(KEYS.SEARCH_HISTORY, JSON.stringify(payload));
    setTerm("");
  };
  return (
    <Swipeable
      ref={swipeableRef as any}
      renderRightActions={(progress, dragX) => {
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              justifyContent: "center",
              alignItems: "center",
              minWidth: 50,
              backgroundColor: COLORS.red,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }}
            onPress={deleteHistoryItem}
          >
            <MaterialIcons name="delete" size={24} color="white" />
          </TouchableOpacity>
        );
      }}
    >
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 5,
          flex: 1,
          paddingHorizontal: 10,
        }}
        activeOpacity={0.7}
        onPress={async () => {
          if (haptics) {
            onImpact();
          }
          const payload = [
            history,
            ...searchHistory.filter(({ id }) => id !== history.id),
          ];
          setSearchHistory(payload);
          await store(KEYS.SEARCH_HISTORY, JSON.stringify(payload));
          setTerm(history.name);
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={[styles.h1, {}]}>{history.name}</Text>
          <Text style={[styles.p, { fontSize: 14, color: "gray" }]}>
            {history.author} • {history.dish_type} • {history.difficult}
          </Text>
        </View>
        <MaterialIcons name="history" size={24} color="black" />
      </TouchableOpacity>
    </Swipeable>
  );
};

export default SearchHistoryItem;
