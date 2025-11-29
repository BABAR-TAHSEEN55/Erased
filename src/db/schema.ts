import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const MessagesTable = pgTable("messages", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  message: varchar().notNull(),
  link: varchar().notNull().unique(),
});
