import React from "react";
import { Alert } from "react-native";
import { AppNavProps } from "../../params";
import HomeHeader from "../../components/Headers/HomeHeader";
import { useMusicStore, useNetworkStore } from "../../store";
import { useDebounce } from "../../hooks";
import HomeRecipes from "../../components/HomeRecipes/HomeRecipes";
import HomeSearchResults from "../../components/HomeSearchResults/HomeSearchResults";
import { stopMusic } from "../../utils";
import { useNavigationState } from "@react-navigation/native";
const Home: React.FunctionComponent<AppNavProps<"Home">> = ({ navigation }) => {
  const { network } = useNetworkStore();
  const state = useNavigationState((state) => state);
  const [term, setTerm] = React.useState<string>("");
  const [openSearch, setOpenSearch] = React.useState<boolean>(false);
  const { setMusic } = useMusicStore();
  const searchTerm = useDebounce(term, 1000);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: ({}) => (
        <HomeHeader
          setOpenSearch={setOpenSearch}
          term={term}
          setTerm={setTerm}
        />
      ),
    });
  }, [navigation, term]);

  React.useEffect(() => {
    if (!network.isInternetReachable) {
      Alert.alert(
        "cookron",
        "We have detected that you don't have active internet connection, you can view your offline recipes.",
        [
          {
            text: "OPEN OFFLINE RECIPES",
            onPress: () => {
              navigation.navigate("Favorites");
            },
          },
          {
            text: "CANCEL",
            style: "destructive",
          },
        ],
        { cancelable: false }
      );
    }
  }, [network]);

  React.useEffect(() => {
    if (state.routes.at(-1)?.name !== "Recipe") {
      (async () => {
        setMusic(false);
        await stopMusic();
      })();
    }
  }, [state]);
  return openSearch ? (
    <HomeSearchResults searchTerm={searchTerm} navigation={navigation} />
  ) : (
    <HomeRecipes navigation={navigation} />
  );
};

export default Home;
