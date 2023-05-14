import {
  View,
  SafeAreaView,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import React from "react";
import { BottomSheet } from "react-native-btr";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { COLORS } from "../../../constants";
import { Transition, Transitioning } from "react-native-reanimated";
import { CategoriesTabs } from "./CategoriesTabs";
import { CategoriesHeader } from "./CategoriesHeader";
import { MainCategoryType } from "../../../types";
import { onImpact } from "../../../utils";
import { Animated } from "react-native";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CategoriesTopHeader } from "./CategoriesTopHeader";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppParamList } from "../../../params";
import { CategoryRecipes } from "./CategoryRecipes";
interface Props {
  toggle: () => void;
  open: boolean;
  navigation: StackNavigationProp<AppParamList, "Home">;
}
const CreateEngineBottomSheet: React.FunctionComponent<Props> = ({
  toggle,
  open,
  navigation,
}) => {
  const navRef = React.useRef<any>();
  const zIndex = React.useRef(new Animated.Value(1)).current;
  const opacity = React.useRef(new Animated.Value(1)).current;
  const [tab, setTab] = React.useState<MainCategoryType>("recipes");
  const {
    dimension: { height, width },
  } = useMediaQuery();
  React.useLayoutEffect(() => {
    if (tab && navRef.current) {
      navRef.current.animateNextTransition();
    }
  }, [tab]);

  const onMomentumScrollBegin = (
    e: NativeSyntheticEvent<NativeScrollEvent>
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
  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
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

  const navTransition = (
    <Transition.Together>
      <Transition.In type="fade" durationMs={1000} />
      <Transition.Change />
      <Transition.Out type="fade" durationMs={1000} />
    </Transition.Together>
  );

  return (
    <BottomSheet
      visible={!!open}
      onBackButtonPress={toggle}
      onBackdropPress={toggle}
    >
      <View
        style={{
          height,
        }}
      >
        <CategoriesTopHeader navigation={navigation} toggle={toggle} />
        <SafeAreaView
          style={{
            flex: 1,
            height: height - 100,
            backgroundColor: COLORS.main,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
          }}
        >
          <CategoriesHeader tab={tab} />
          <Transitioning.View transition={navTransition} ref={navRef}>
            <CategoriesTabs tab={tab} setTab={setTab} />
          </Transitioning.View>
          <CategoryRecipes
            navigation={navigation}
            onMomentumScrollEnd={onMomentumScrollEnd}
            onMomentumScrollBegin={onMomentumScrollBegin}
            category={tab}
            toggle={toggle}
          />
          <Animated.View
            style={{
              position: "absolute",
              opacity,
              zIndex,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                onImpact();
                toggle();
              }}
              style={[
                style.button,
                {
                  top: height * 0.77,
                  left: width / 2 - 25,
                },
              ]}
              activeOpacity={0.7}
            >
              <Ionicons name="ios-close" size={24} color={COLORS.tertiary} />
            </TouchableOpacity>
          </Animated.View>
        </SafeAreaView>
      </View>
    </BottomSheet>
  );
};

export default CreateEngineBottomSheet;

const style = StyleSheet.create({
  button: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    padding: 5,
    shadowOffset: { height: 2, width: 2 },
    shadowColor: COLORS.red,
    shadowOpacity: 1,
    shadowRadius: 2,
  },
});
