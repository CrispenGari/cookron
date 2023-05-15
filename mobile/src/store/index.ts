import { create } from "zustand";
import { NetworkType } from "../types";

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
