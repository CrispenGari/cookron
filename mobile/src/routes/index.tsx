import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { AppParamList } from "../params";
import { Landing, Home, Settings, Favorites, Recipe } from "../screens";
import { COLORS, FONTS } from "../constants";
import * as Network from "expo-network";
import React from "react";
import { useNetworkStore } from "../store";
const Stack = createStackNavigator<AppParamList>();
const Routes = () => {
  const { setNetwork } = useNetworkStore();
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      (async () => {
        const { type, isConnected, isInternetReachable } =
          await Network.getNetworkStateAsync();
        setNetwork({ type, isConnected, isInternetReachable });
      })();
    }
    return () => {
      mounted = false;
    };
  }, [setNetwork]);

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
