import { ObjectId } from "https://deno.land/x/mongo@v0.31.2/mod.ts";
export interface RecipeSchema {
  _id: ObjectId;
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
}
