import "react-native-gesture-handler";
import React from "react";
import { View, LogBox } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Fonts } from "./src/constants";
import Routes from "./src/routes";
import ReactQueryProvider from "./src/providers/ReactQueryProvider";
import { StatusBar } from "expo-status-bar";
LogBox.ignoreLogs;
LogBox.ignoreAllLogs();
SplashScreen.preventAutoHideAsync();
const App = () => {
  const [ready, setReady] = React.useState<boolean>(false);
  React.useLayoutEffect(() => {
    (async () => {
      await Font.loadAsync(Fonts);
    })()
      .catch((e) => console.warn(e))
      .finally(() => setReady(true));
  }, []);

  const onLayoutRootView = React.useCallback(async () => {
    if (ready) {
      await SplashScreen.hideAsync();
    }
  }, [ready]);

  if (!ready) return null;
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <StatusBar
        style="dark"
        translucent={true}
        networkActivityIndicatorVisible={true}
        animated={true}
      />
      <ReactQueryProvider>
        <Routes />
      </ReactQueryProvider>
    </View>
  );
};
export default App;
