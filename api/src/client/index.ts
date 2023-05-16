import { MongoClient } from "https://deno.land/x/mongo@v0.31.2/mod.ts";
import { load } from "https://deno.land/std@0.186.0/dotenv/mod.ts";
const env = await load();
export const client = new MongoClient();
try {
  const url = `mongodb+srv://crispengari:CoN1nwIKSY3I8Mpw@cluster0.kh7riqf.mongodb.net/cookron?retryWrites=true&w=majority&authMechanism=SCRAM-SHA-1`;
  await client.connect(url);
} catch (error) {
  console.log({ error: error.message });
}
