import { pgTable, text, serial, jsonb, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const PRODUCT_CATEGORIES = ["Frame Kits", "Wheels", "Boards", "Full Robot Kits"] as const;
export type ProductCategory = typeof PRODUCT_CATEGORIES[number];

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrls: jsonb("image_urls").$type<string[]>().notNull(),
  features: jsonb("features").$type<string[]>().notNull(),
  technicalSpecs: jsonb("technical_specs").$type<{ label: string; value: string }[]>().notNull(),
  category: text("category"),
  price: integer("price").notNull(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
   email: text("email").notNull(),
  message: text("message").notNull(),
});

export type OrderItem = {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
};

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  address: text("address").notNull(),
  notes: text("notes"),
  items: jsonb("items").$type<OrderItem[]>().notNull(),
  totalPrice: integer("total_price").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export const insertMessageSchema = createInsertSchema(messages).omit({ id: true });
export const insertOrderSchema = createInsertSchema(orders).omit({ id: true, createdAt: true });

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
