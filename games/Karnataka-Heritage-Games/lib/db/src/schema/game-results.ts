import { createInsertSchema } from "drizzle-zod";
import {
  doublePrecision,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const gameResultsTable = pgTable("game_results", {
  id: serial("id").primaryKey(),
  playerId: text("player_id").notNull(),
  gameId: text("game_id").notNull(),
  gameName: text("game_name").notNull(),
  difficulty: text("difficulty").notNull(),
  score: integer("score").notNull(),
  accuracy: doublePrecision("accuracy").notNull(),
  durationSeconds: integer("duration_seconds").notNull(),
  totalMoves: integer("total_moves").notNull(),
  validMoves: integer("valid_moves").notNull(),
  invalidMoves: integer("invalid_moves").notNull(),
  stats: jsonb("stats").$type<Record<string, number>>().notNull(),
  result: text("result").notNull(),
  startedAt: timestamp("started_at", { withTimezone: true }).notNull(),
  completedAt: timestamp("completed_at", { withTimezone: true }).notNull(),
});

export const insertGameResultSchema = createInsertSchema(gameResultsTable).omit({
  id: true,
});

export type GameResult = typeof gameResultsTable.$inferSelect;
export type InsertGameResult = typeof gameResultsTable.$inferInsert;