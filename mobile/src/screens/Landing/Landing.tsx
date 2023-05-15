import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, FONTS, KEYS, logo } from "../../constants";
import { AppNavProps } from "../../params";
import { styles } from "../../styles";
import * as Animatable from "react-native-animatable";
import TypeWriter from "react-native-typewriter";
import { LinearGradient } from "expo-linear-gradient";
import { del, retrieve, store } from "../../utils";
import Loading from "../../components/Loading/Loading";
import { SettingsType } from "../../types";

const messages: Array<string> = [
  "Hello welcome to Cookroon, learn how to cook using our app.",
  "Explore more than 3,000 different recipes in our app.",
  "You can explore our available recipes from different Chefs within our app.",
  "You can expand your knowledge as a Chef by exploring all the dishes in this app and how other Chefs prepare different dishes to satisfy all.",
  "Most importantly you can favorite dishes, bookmark dishes for a massive database of dishes.",
];
const Landing: React.FunctionComponent<AppNavProps<"Landing">> = ({
  navigation,
}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  const [loading, setLoading] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      if (index >= messages.length - 1) {
        setIndex(0);
      } else {
        setIndex((state) => state + 1);
      }
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, [index]);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await retrieve(KEYS.NEW_TO_APP);
      if (!!res) {
        const _payload = JSON.parse(res as string) as {
          new: boolean;
        };
        if (_payload.new === false) {
          navigation.replace("Home");
        }
      }
      setLoading(false);
    })();
  }, [navigation]);

  if (loading) return <Loading />;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.main,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flex: 0.7,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.main,
          maxWidth: 500,
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
        <View
          style={{
            width: "100%",
            maxWidth: 300,
            marginVertical: 10,
            padding: 10,
            margin: 10,
          }}
        >
          <TypeWriter
            style={[
              styles.p,
              {
                textAlign: "center",
                height: 100,
              },
            ]}
            typing={1}
            maxDelay={-50}
          >
            {messages[index]}
          </TypeWriter>
        </View>
      </View>
      <View
        style={{
          flex: 0.3,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.main,
          width: "100%",
          maxWidth: 500,
        }}
      >
        <LinearGradient
          style={[
            styles.button,
            {
              padding: 10,
              marginTop: 10,
              maxWidth: 200,
            },
          ]}
          start={{
            x: 0,
            y: 1,
          }}
          end={{
            x: 0,
            y: 0,
          }}
          colors={[COLORS.primary, COLORS.tertiary]}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={async () => {
              const data: {
                new: boolean;
              } = { new: false };
              await store(KEYS.NEW_TO_APP, JSON.stringify(data));
              const settings: SettingsType = {
                haptics: true,
                limit: 21,
              };
              await store(KEYS.APP_SETTINGS, JSON.stringify(settings));
              navigation.replace("Home");
            }}
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={[styles.button__text, { color: COLORS.white }]}>
              CONTINUE
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};

export default Landing;
