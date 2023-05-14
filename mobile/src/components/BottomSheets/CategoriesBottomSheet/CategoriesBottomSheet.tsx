import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import { BottomSheet } from "react-native-btr";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { COLORS } from "../../../constants";
import { Transition, Transitioning } from "react-native-reanimated";
import { CategoriesTabs } from "./CategoriesTabs";
import { CategoriesHeader } from "./CategoriesHeader";
import { MainCategoryType } from "../../../types";
interface Props {
  toggle: () => void;
  open: boolean;
}
const CreateEngineBottomSheet: React.FunctionComponent<Props> = ({
  toggle,
  open,
}) => {
  const navRef = React.useRef<any>();

  const [tab, setTab] = React.useState<MainCategoryType>("recipes");
  const {
    dimension: { height },
  } = useMediaQuery();

  React.useLayoutEffect(() => {
    if (tab && navRef.current) {
      navRef.current.animateNextTransition();
    }
  }, [tab]);

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
      <SafeAreaView
        style={{
          backgroundColor: COLORS.secondary,
          height: height - 100,
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
        }}
      >
        <CategoriesHeader tab={tab} />
        <Transitioning.View transition={navTransition} ref={navRef}>
          <CategoriesTabs tab={tab} setTab={setTab} />
        </Transitioning.View>
      </SafeAreaView>
    </BottomSheet>
  );
};

export default CreateEngineBottomSheet;
