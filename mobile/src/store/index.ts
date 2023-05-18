import { create } from "zustand";
import { NetworkType, RecipeType, SettingsType } from "../types";
export const useSearchHistoryStore = create<{
  history: RecipeType[];
  setSearchHistory: (seachHistory: RecipeType[]) => void;
}>((set) => ({
  history: [],
  setSearchHistory: (history: RecipeType[]) => set({ history }),
}));

export const useBookmarksStore = create<{
  bookmarks: RecipeType[];
  setBookmarks: (bookmarks: RecipeType[]) => void;
}>((set) => ({
  bookmarks: [],
  setBookmarks: (bookmarks: RecipeType[]) => set({ bookmarks }),
}));

export const useNetworkStore = create<{
  network: Required<NetworkType>;
  setNetwork: (network: Required<NetworkType>) => void;
}>((set) => ({
  network: {
    isConnected: true,
    isInternetReachable: true,
    type: null,
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
