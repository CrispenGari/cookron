import React from "react";
import { View, Animated } from "react-native";

const Animations: React.FC<{}> = () => {
  const skeletonAnimation = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.loop(
      Animated.timing(skeletonAnimation, {
        toValue: 1,
        delay: 0,
        duration: 2000,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  const translateX = skeletonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  });
  return (
    <Animated.View
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        width: "20%",
        height: "100%",
        transform: [{ rotate: "10deg" }, { translateX }],
        position: "absolute",
      }}
    />
  );
};

export default Animations;
