import { NetInfoStateType } from "@react-native-community/netinfo";

export type NetworkType = {
  type: NetInfoStateType | null;
  isConnected: boolean | null;
  isInternetReachable: boolean | null;
};

export type SettingsType = {
  haptics: boolean;
  limit: number;
};

export type RecipeType = {
  id: string;
  url: string;
  image: string;
  name: string;
  description: string;
  author: string;
  rattings: number;
  ingredients: string[];
  steps: string[];
  nutrients: any;
  times: {
    Preparation: string;
    Cooking: string;
  };
  serves: number;
  difficult: string;
  subcategory: string;
  dish_type: string;
  maincategory: string;
};
export type MainCategoryType =
  | "recipes"
  | "health"
  | "baking"
  | "budget"
  | "inspiration";

export type ResponseType = {
  recipes: RecipeType[];
  hasNext: boolean;
  total: number;
  lastId: string | undefined;
  category: MainCategoryType | string;
};
