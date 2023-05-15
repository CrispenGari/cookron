import * as Haptics from "expo-haptics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";

let sound: Audio.Sound | undefined;
export const onImpact = () => Haptics.impactAsync();
export const playMusic = async () => {
  const { sound: s, status } = await Audio.Sound.createAsync(
    require("../../assets/sounds/music.mp3"),
    {
      shouldPlay: true,
      isLooping: true,
      isMuted: false,
    }
  );
  if (status.isLoaded) {
    sound = s;
  }
  if (!!sound) {
    await sound.playAsync().catch((err) => console.log(err));
  }
};
export const stopMusic = async () => {
  if (!!sound) {
    await sound.pauseAsync();
  }
};

export const store = async (key: string, value: string): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error: any) {
    return false;
  }
};

export const del = async (key: string): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error: any) {
    return false;
  }
};

export const retrieve = async (key: string): Promise<string | null> => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data;
  } catch (error: any) {
    return null;
  }
};
