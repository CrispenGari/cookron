import "react-native-gesture-handler";
import React from "react";
import { Text, View, StatusBar, LogBox } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { FONTS, Fonts } from "./src/constants";
import Routes from "./src/routes";
import ReactQueryProvider from "./src/providers/ReactQueryProvider";
import { usePlatform } from "./src/hooks";
LogBox.ignoreLogs;
LogBox.ignoreAllLogs();
SplashScreen.preventAutoHideAsync();
const App = () => {
  const [ready, setReady] = React.useState<boolean>(false);
  const { os } = usePlatform();
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
      <StatusBar barStyle={"dark-content"} />
      <ReactQueryProvider>
        <Routes />
      </ReactQueryProvider>
    </View>
  );
};
export default App;
