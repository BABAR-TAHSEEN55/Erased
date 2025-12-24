import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
dotenv.config();
const databaseURL = process.env.DATABASE_URL!;
if (!databaseURL) {
  throw new Error("DATABASE_URL");
}

export const db = drizzle(databaseURL);
