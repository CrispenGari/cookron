import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../../constants";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { StackHeaderProps } from "@react-navigation/stack";
import { RecipeType } from "../../types";
import { styles } from "../../styles";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import { onImpact, playMusic, stopMusic } from "../../utils";
import { useMusicStore } from "../../store";
const RecipeHeader: React.FunctionComponent<
  StackHeaderProps & {
    recipe: RecipeType;
  }
> = ({ navigation, recipe }) => {
  const {
    dimension: { width },
  } = useMediaQuery();
  const { music, setMusic } = useMusicStore();
  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.secondary,
        height: width >= 600 ? 80 : 100,
        justifyContent: "center",
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            onImpact();
            navigation.goBack();
          }}
          style={{ paddingHorizontal: 10 }}
        >
          <Ionicons name="chevron-back" size={24} color={COLORS.main} />
        </TouchableOpacity>
        <View style={{ flex: 1, marginHorizontal: 10 }}>
          <Text style={[styles.h1, { fontSize: 22 }]}>{recipe.name}</Text>
          <Text style={[styles.p, { fontSize: 14 }]}>by {recipe.author}</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={async () => {
            onImpact();
            if (music) {
              setMusic(false);
              await stopMusic();
            } else {
              setMusic(true);
              await playMusic();
            }
          }}
          style={{ paddingHorizontal: 10 }}
        >
          {!music ? (
            <Feather name="music" size={24} color={COLORS.main} />
          ) : (
            <MaterialIcons name="music-off" size={24} color={COLORS.main} />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RecipeHeader;
