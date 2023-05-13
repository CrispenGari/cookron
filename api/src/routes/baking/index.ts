import { Router } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import { getQuery } from "https://deno.land/x/oak@v12.4.0/helpers.ts";
import { Baking } from "../../schema/index.ts";
import { PAGE_LIMIT } from "../../constants/index.ts";
const bakingRouter = new Router();

bakingRouter.get("/baking", async (ctx) => {
  const params = getQuery(ctx, { mergeParams: true });
  await ctx.response.headers.set("Content-Type", "application/json");
  const lastDocument = await Baking.find()
    .sort({ id: 1 }) // oldest to newest
    .limit(1)
    .toArray();
  const last = lastDocument[0];
  if (params.lastId && params.lastId !== "undefined") {
    const recipes = await Baking.find({
      id: { $lt: params.lastId },
    })
      .sort({ id: -1 }) // newest to oldest
      .limit(PAGE_LIMIT)
      .toArray();
    ctx.response.status = 200;
    const _lastId = recipes.at(-1)?.id;
    return (ctx.response.body = {
      recipes,
      hasNext: _lastId !== last.id,
      total: recipes.length,
      lastId: _lastId,
      category: "baking",
    });
  } else {
    const recipes = await Baking.find()
      .sort({ id: -1 })
      .limit(PAGE_LIMIT)
      .toArray();
    ctx.response.status = 200;
    const _lastId = recipes.at(-1)?.id;
    return (ctx.response.body = {
      recipes,
      hasNext: _lastId !== last.id,
      total: recipes.length,
      lastId: _lastId,
      category: "baking",
    });
  }
});
export default new Router().use(
  "/api/recipes",
  bakingRouter.routes(),
  bakingRouter.allowedMethods()
);
