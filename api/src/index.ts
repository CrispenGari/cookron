import { Application } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import { oakCors as cors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import {
  bakingRouter,
  healthRouter,
  recipesRouter,
  budgetsRouter,
  inspirationsRouter,
} from "./routes/index.ts";

// | "recipes"
//   | "health"
//   | "baking"
//   | "budget"
//   | "inspiration";

const app = new Application();

app.use(cors({}));
app.use(recipesRouter.routes());
app.use(bakingRouter.routes());
app.use(budgetsRouter.routes());
app.use(inspirationsRouter.routes());
app.use(healthRouter.routes());
app.addEventListener(
  "listen",
  ({ port }) => {
    console.log("the server has started at port: " + port.toString());
  },
  {}
);
await app.listen({ port: 3001, secure: false });
