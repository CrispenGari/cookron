import { View, Text, ScrollView } from "react-native";
import React from "react";
import { COLORS } from "../../constants";
import { AppNavProps } from "../../params";
import Header from "../../components/Header/Header";
import { Transition, Transitioning } from "react-native-reanimated";
import TabNav from "../../components/TabNav/TabNav";
import { data } from "../../data";
import Categories from "../../components/Categories/Categories";

const Home: React.FunctionComponent<AppNavProps<"Home">> = ({ navigation }) => {
  const ref = React.useRef<any>();

  const [state, setState] = React.useState({
    selectedTab: 0,
  });
  const selectTab = (index: number) => {
    if (ref.current) {
      ref.current.animateNextTransition();
    }
    setState((state) => ({ ...state, selectedTab: index }));
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: ({}) => <Header />,
    });
  }, [navigation]);
  React.useLayoutEffect(() => {
    if (ref.current) {
      ref.current.animateNextTransition();
    }
  }, []);

  const transition = (
    <Transition.Together>
      <Transition.In
        type="slide-right"
        durationMs={2000}
        interpolation="easeInOut"
      />
      <Transition.In type="fade" durationMs={2000} />
      <Transition.Change />
      <Transition.Out type="fade" durationMs={2000} />
    </Transition.Together>
  );
  return (
    <View
      style={{
        backgroundColor: COLORS.main,
        flex: 1,
      }}
    >
      <Transitioning.View transition={transition} ref={ref}>
        <TabNav state={state} selectTab={selectTab} setState={setState} />
      </Transitioning.View>
      <View style={{ flex: 1, padding: 10 }}>
        <Categories
          category="recipes"
          recipes={data.filter((recipe) => recipe.maincategory === "recipes")}
        />
      </View>
    </View>
  );
};

export default Home;
