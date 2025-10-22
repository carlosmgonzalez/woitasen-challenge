import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const orderStatus = pgEnum("order_status", [
  "PENDING",
  "COMPLETED",
  "CANCELLED",
]);

export const order = pgTable("order", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  customerName: text("customer_name").notNull(),
  item: text("item").notNull(),
  quantity: integer("quantity").notNull(),
  status: orderStatus("status").default("PENDING").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
