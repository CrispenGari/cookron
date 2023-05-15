import React from "react";
import { AppNavProps } from "../../params";
import HomeHeader from "../../components/Headers/HomeHeader";
import { useNetworkStore } from "../../store";
import { useDebounce } from "../../hooks";
import HomeRecipes from "../../components/HomeRecipes/HomeRecipes";
import HomeSearchResults from "../../components/HomeSearchResults/HomeSearchResults";
const Home: React.FunctionComponent<AppNavProps<"Home">> = ({ navigation }) => {
  const { network } = useNetworkStore();
  const [term, setTerm] = React.useState<string>("");
  const [openSearch, setOpenSearch] = React.useState<boolean>(false);
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
  return openSearch ? (
    <HomeSearchResults searchTerm={searchTerm} navigation={navigation} />
  ) : (
    <HomeRecipes navigation={navigation} />
  );
};

export default Home;
