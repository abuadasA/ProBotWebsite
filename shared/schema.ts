import { pgTable, text, serial, jsonb, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrls: jsonb("image_urls").$type<string[]>().notNull(),
  features: jsonb("features").$type<string[]>().notNull(),
  technicalSpecs: jsonb("technical_specs").$type<{ label: string; value: string }[]>().notNull(),
  price: integer("price").notNull(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
   email: text("email").notNull(),
  message: text("message").notNull(),
});

export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export const insertMessageSchema = createInsertSchema(messages).omit({ id: true });

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
