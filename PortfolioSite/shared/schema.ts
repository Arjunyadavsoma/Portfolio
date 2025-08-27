import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const chatMessages = pgTable("chat_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  message: text("message").notNull(),
  response: text("response").notNull(),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).pick({
  message: true,
  response: true,
  metadata: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;

// Portfolio data types
export const portfolioDataSchema = z.object({
  projects: z.array(z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    image: z.string(),
    technologies: z.array(z.string()),
    liveUrl: z.string().optional(),
    githubUrl: z.string().optional(),
  })),
  skills: z.array(z.object({
    name: z.string(),
    level: z.number().min(0).max(100),
    icon: z.string(),
    category: z.string(),
  })),
  experience: z.object({
    title: z.string(),
    description: z.string(),
    years: z.number(),
  }),
  certificates: z.array(z.object({
    name: z.string(),
    issuer: z.string(),
    icon: z.string(),
    date: z.string(),
  })),
});

export type PortfolioData = z.infer<typeof portfolioDataSchema>;
