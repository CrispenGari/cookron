import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { AppParamList } from "../params";
import { Landing, Home, Settings, Favorites, Recipe } from "../screens";
import { COLORS, FONTS, KEYS } from "../constants";
import NetInfo from "@react-native-community/netinfo";
import React from "react";
import {
  useBookmarksStore,
  useNetworkStore,
  useSearchHistoryStore,
} from "../store";
import { retrieve } from "../utils";
const Stack = createStackNavigator<AppParamList>();
const Routes = () => {
  const { setNetwork } = useNetworkStore();
  const { setBookmarks } = useBookmarksStore();
  const { setSearchHistory } = useSearchHistoryStore();
  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(
      ({ type, isInternetReachable, isConnected }) => {
        setNetwork({ type, isConnected, isInternetReachable });
      }
    );
    return () => unsubscribe();
  }, [setNetwork]);

  React.useEffect(() => {
    (async () => {
      const bookmarks = await retrieve(KEYS.BOOK_MARKS);
      const history = await retrieve(KEYS.SEARCH_HISTORY);
      setSearchHistory(history ? JSON.parse(history) : []);
      setBookmarks(bookmarks ? JSON.parse(bookmarks) : []);
    })();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{
          headerStyle: {
            shadowOpacity: 0,
            elevation: 0,
            borderBottomColor: "transparent",
            height: 100,
            backgroundColor: COLORS.secondary,
          },
          headerTitleStyle: {
            fontFamily: FONTS.regularBold,
            fontSize: 24,
          },
        }}
      >
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="Favorites" component={Favorites} />
        <Stack.Screen name="Recipe" component={Recipe} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
