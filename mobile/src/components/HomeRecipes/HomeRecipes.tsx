import {
  View,
  Animated,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";

import { COLORS, logo } from "../../constants";
import { onImpact } from "../../utils";
import { CategoriesBottomSheet } from "../BottomSheets";
import Favorites from "../Favorites/Favorites";

import TabNav from "../TabNav/TabNav";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppParamList } from "../../params";

import { useMediaQuery } from "../../hooks";

import ExploreRecipes from "./ExploreRecipes";
import Recommendations from "./Recommendations";
import { useSettingsStore } from "../../store";

const HomeRecipes: React.FunctionComponent<{
  navigation: StackNavigationProp<AppParamList, "Home">;
}> = ({ navigation }) => {
  const {
    dimension: { height, width },
  } = useMediaQuery();
  const navRef = React.useRef<any>();
  const {
    settings: { haptics },
  } = useSettingsStore();
  const zIndex = React.useRef(new Animated.Value(1)).current;
  const opacity = React.useRef(new Animated.Value(1)).current;
  const [state, setState] = React.useState({
    selectedTab: 0,
  });
  const selectTab = (index: number) => {
    if (navRef.current) {
      navRef.current.animateNextTransition();
    }
    if (haptics) {
      onImpact();
    }

    setState((state) => ({ ...state, selectedTab: index }));
  };
  const onMomentumScrollBegin = (
    _e: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    Animated.sequence([
      Animated.timing(zIndex, {
        duration: 0,
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        duration: 0,
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  };
  const onMomentumScrollEnd = (_e: NativeSyntheticEvent<NativeScrollEvent>) => {
    Animated.sequence([
      Animated.timing(zIndex, {
        duration: 300,
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        duration: 300,
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  };
  React.useLayoutEffect(() => {
    if (navRef.current) {
      navRef.current.animateNextTransition();
    }
  }, []);

  const [openCategories, setOpenCategories] = React.useState<boolean>(false);
  const toggleOpenCategories = () => setOpenCategories((state) => !state);

  return (
    <View
      style={{
        backgroundColor: COLORS.main,
        flex: 1,
        position: "relative",
      }}
    >
      <CategoriesBottomSheet
        open={openCategories}
        toggle={toggleOpenCategories}
        navigation={navigation}
      />
      <Animated.View
        style={{
          zIndex,
          position: "absolute",
          opacity,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (haptics) {
              onImpact();
            }

            toggleOpenCategories();
          }}
          style={[
            style.button,
            {
              top: height * 0.72,
              left: width / 2 - 30,
              elevation: 2,
              shadowOpacity: 1,
              shadowRadius: 2,
            },
          ]}
          activeOpacity={0.7}
        >
          <Image source={logo} style={style.img} />
        </TouchableOpacity>
      </Animated.View>
      <View>
        <TabNav state={state} selectTab={selectTab} setState={setState} />
      </View>
      {state.selectedTab === 1 ? (
        <View style={{ flex: 1 }}>
          <Favorites
            navigation={navigation}
            onMomentumScrollEnd={onMomentumScrollEnd}
            onMomentumScrollBegin={onMomentumScrollBegin}
          />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <Recommendations navigation={navigation} />
          <ExploreRecipes
            onMomentumScrollEnd={onMomentumScrollEnd}
            onMomentumScrollBegin={onMomentumScrollBegin}
            navigation={navigation}
          />
        </View>
      )}
    </View>
  );
};

export default HomeRecipes;

const style = StyleSheet.create({
  img: {
    width: "100%",
    height: "100%",
    flex: 1,
    resizeMode: "contain",
  },
  button: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    padding: 5,
    shadowOffset: { height: 2, width: 2 },
    shadowColor: COLORS.red,
    shadowOpacity: 1,
    shadowRadius: 5,
  },
});
