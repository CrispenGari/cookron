import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { AppParamList } from "../params";
import { Landing, Home, Settings } from "../screens";
import { COLORS, FONTS } from "../constants";
const Stack = createStackNavigator<AppParamList>();
const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
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
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;