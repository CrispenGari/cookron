import { View, Text, Animated, StyleProp, ViewStyle } from "react-native";
import React from "react";
interface Props {
  style?: StyleProp<ViewStyle>;
  duration?: number;
  delay?: number;
}
const ContentLoader: React.FunctionComponent<Props> = ({
  style,
  duration,
  delay,
}) => {
  const skeletonAnimation = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.loop(
      Animated.timing(skeletonAnimation, {
        toValue: 1,
        delay: delay ? delay : 0,
        duration: duration ? duration : 2000,
        useNativeDriver: false,
      })
    ).start();
  }, [duration]);
  const translateX = skeletonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  });
  return (
    <View style={style}>
      <Animated.View
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          width: "20%",
          height: "100%",
          transform: [{ rotate: "10deg" }, { translateX }],
          position: "absolute",
        }}
      />
    </View>
  );
};

export default ContentLoader;
