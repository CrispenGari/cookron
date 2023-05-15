import { View, Text } from "react-native";
import React from "react";
import { COLORS, logo, FONTS } from "../../constants";
import { styles } from "../../styles";
import * as Animatable from "react-native-animatable";

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.main,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={[
          styles.h1,
          {
            fontSize: 25,
            letterSpacing: 1,
            marginBottom: 20,
          },
        ]}
      >
        cookron
      </Text>
      <Animatable.Image
        animation={"bounce"}
        duration={2000}
        iterationCount={1}
        easing={"linear"}
        direction={"normal"}
        useNativeDriver={false}
        source={logo}
        style={{
          width: 100,
          height: 100,
          marginVertical: 30,
          resizeMode: "contain",
        }}
      />
      <Text style={{ fontFamily: FONTS.italic }}>Loading...</Text>
    </View>
  );
};

export default Loading;
