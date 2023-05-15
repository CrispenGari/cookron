import { create } from "zustand";
import { NetworkType, SettingsType } from "../types";

export const useNetworkStore = create<{
  network: Required<NetworkType>;
  setNetwork: (network: Required<NetworkType>) => void;
}>((set) => ({
  network: {
    isConnected: false,
    isInternetReachable: false,
    type: undefined,
  },
  setNetwork: (network: Required<NetworkType>) => set({ network }),
}));

export const useSettingsStore = create<{
  settings: Required<SettingsType>;
  setSettings: (settings: SettingsType) => void;
}>((set) => ({
  settings: { haptics: true, limit: 21 },
  setSettings: (settings: SettingsType) => set({ settings }),
}));

export const useMusicStore = create<{
  music: boolean;
  setMusic: (val: boolean) => void;
}>((set) => ({
  music: false,
  setMusic: (val) => set({ music: val }),
}));
