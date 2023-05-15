import { Router } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import { getQuery } from "https://deno.land/x/oak@v12.4.0/helpers.ts";
import { Budget } from "../../schema/index.ts";
import { PAGE_LIMIT } from "../../constants/index.ts";

const budgetsRouter = new Router();
budgetsRouter.get("/budget", async (ctx) => {
  const params = getQuery(ctx, { mergeParams: true });
  await ctx.response.headers.set("Content-Type", "application/json");
  const lastDocument = await Budget.find()
    .sort({ id: 1 }) // oldest to newest
    .limit(1)
    .toArray();
  const last = lastDocument[0];
  if (params.lastId && params.lastId !== "undefined") {
    const recipes = await Budget.find({
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
      category: "budget",
    });
  } else {
    const recipes = await Budget.find()
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
      category: "budget",
    });
  }
});

budgetsRouter.get("/budget/search", async (ctx) => {
  const params = getQuery(ctx, { mergeParams: true });
  const searchTerm = params.searchTerm;
  await ctx.response.headers.set("Content-Type", "application/json");

  if (!searchTerm || searchTerm.trim().length < 3) {
    ctx.response.status = 200;
    return (ctx.response.body = {
      recipes: [],
      hasNext: false,
      total: 0,
      lastId: undefined,
      category: "budget",
    });
  }
  try {
    const lastDocument = await Budget.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { author: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
        { subcategory: { $regex: searchTerm, $options: "i" } },
        { difficult: { $regex: searchTerm, $options: "i" } },
        { dish_type: { $regex: searchTerm, $options: "i" } },
      ],
    })
      .sort({ rattings: -1, id: 1 })
      .limit(1)
      .toArray();
    const last = lastDocument[0];
    if (params.lastId && params.lastId !== "undefined") {
      const recipes = await Budget.find({
        $or: [
          { name: { $regex: searchTerm, $options: "i" } },
          { author: { $regex: searchTerm, $options: "i" } },
          { description: { $regex: searchTerm, $options: "i" } },
          { subcategory: { $regex: searchTerm, $options: "i" } },
          { difficult: { $regex: searchTerm, $options: "i" } },
          { dish_type: { $regex: searchTerm, $options: "i" } },
        ],
        id: { $lt: params.lastId },
      })
        .sort({ rattings: -1, id: -1 }) // newest to oldest
        .limit(PAGE_LIMIT)
        .toArray();
      ctx.response.status = 200;
      const _lastId = recipes.at(-1)?.id;
      return (ctx.response.body = {
        recipes,
        hasNext: _lastId !== last.id,
        total: recipes.length,
        lastId: _lastId,
        category: "budget",
      });
    } else {
      const recipes = await Budget.find({
        $or: [
          { name: { $regex: searchTerm, $options: "i" } },
          { author: { $regex: searchTerm, $options: "i" } },
          { description: { $regex: searchTerm, $options: "i" } },
          { subcategory: { $regex: searchTerm, $options: "i" } },
          { difficult: { $regex: searchTerm, $options: "i" } },
          { dish_type: { $regex: searchTerm, $options: "i" } },
        ],
      })
        .sort({ rattings: -1, id: -1 }) // newest to oldest
        .limit(PAGE_LIMIT)
        .toArray();
      ctx.response.status = 200;
      const _lastId = recipes.at(-1)?.id;
      return (ctx.response.body = {
        recipes,
        hasNext: _lastId !== last.id,
        total: recipes.length,
        lastId: _lastId,
        category: "budget",
      });
    }
  } catch (error) {
    console.log({ error: error.message });
    ctx.response.status = 200;
    return (ctx.response.body = {
      recipes: [],
      hasNext: false,
      total: 0,
      lastId: undefined,
      category: "budget",
    });
  }
});

export default new Router().use(
  "/api/recipes",
  budgetsRouter.routes(),
  budgetsRouter.allowedMethods()
);
