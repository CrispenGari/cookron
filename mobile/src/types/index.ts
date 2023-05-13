import { data } from "../data";

export type Recipe = (typeof data)[number];
export type MainCategoryType =
  | "recipes"
  | "health"
  | "baking"
  | "budget"
  | "inspiration";
