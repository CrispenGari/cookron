import { client } from "../client/index.ts";
import { RecipeSchema } from "../types/index.ts";
const db = client.database("cookron");
export const Recipe = db.collection<RecipeSchema>("recipes");
export const Health = db.collection<RecipeSchema>("health");
export const Baking = db.collection<RecipeSchema>("baking");
export const Budget = db.collection<RecipeSchema>("budgets");
export const Inspiration = db.collection<RecipeSchema>("inspirations");
