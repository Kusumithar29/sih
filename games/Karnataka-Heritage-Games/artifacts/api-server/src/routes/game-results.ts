import { Router, type IRouter } from "express";
import { and, desc, eq } from "drizzle-orm";
import {
  CreateGameResultBody,
  CreateGameResultResponse,
  GetGameStatsResponse,
  ListGameResultsQueryParams,
  ListGameResultsResponse,
  ListGameResultsResponseItem,
} from "@workspace/api-zod";
import { db } from "@workspace/db";
import { gameResultsTable, type GameResult } from "@workspace/db/schema";

const router: IRouter = Router();

const GAME_IDS = [
  "aadu-huli-aata",
  "ali-guli-mane",
  "chowka-bara",
  "pagade",
  "navakankari",
] as const;

function serializeResult(result: GameResult) {
  return ListGameResultsResponseItem.parse({
    ...result,
    startedAt: result.startedAt.toISOString(),
    completedAt: result.completedAt.toISOString(),
  });
}

router.get("/game-results", async (req, res) => {
  const query = ListGameResultsQueryParams.parse(req.query);
  const results = await db
    .select()
    .from(gameResultsTable)
    .where(eq(gameResultsTable.playerId, query.playerId))
    .orderBy(desc(gameResultsTable.completedAt))
    .limit(100);

  res.json(ListGameResultsResponse.parse(results.map(serializeResult)));
});

router.post("/game-results", async (req, res) => {
  const body = CreateGameResultBody.parse(req.body);
  const [created] = await db
    .insert(gameResultsTable)
    .values({
      ...body,
      startedAt: new Date(body.startedAt),
      completedAt: new Date(body.completedAt),
    })
    .returning();

  res.status(201).json(
    CreateGameResultResponse.parse(serializeResult(created)),
  );
});

router.get("/game-stats", async (req, res) => {
  const query = ListGameResultsQueryParams.parse(req.query);
  const results = await db
    .select()
    .from(gameResultsTable)
    .where(eq(gameResultsTable.playerId, query.playerId))
    .orderBy(desc(gameResultsTable.completedAt));

  const wins = results.filter((result) => result.result === "win").length;
  const gameStats = Object.fromEntries(
    GAME_IDS.map((gameId) => {
      const gameResults = results.filter((result) => result.gameId === gameId);
      return [
        gameId,
        {
          bestScore: gameResults.length
            ? Math.max(...gameResults.map((result) => result.score))
            : 0,
          bestAccuracy: gameResults.length
            ? Math.max(...gameResults.map((result) => result.accuracy))
            : 0,
          fastestTime: gameResults.length
            ? Math.min(...gameResults.map((result) => result.durationSeconds))
            : 0,
          attempts: gameResults.length,
          wins: gameResults.filter((result) => result.result === "win").length,
          recentResults: gameResults.slice(0, 8).map(serializeResult),
        },
      ];
    }),
  );
  const bestScore = results.length
    ? Math.max(...results.map((result) => result.score))
    : 0;
  const bestAccuracy = results.length
    ? Math.max(...results.map((result) => result.accuracy))
    : 0;
  const fastestTime = results.length
    ? Math.min(...results.map((result) => result.durationSeconds))
    : 0;
  const gameProgress = Object.fromEntries(
    GAME_IDS.map((gameId) => [gameId, results.some((result) => result.gameId === gameId)]),
  );

  res.json(
    GetGameStatsResponse.parse({
      totalGames: GAME_IDS.length,
      completedGames: Object.values(gameProgress).filter(Boolean).length,
      bestScore,
      bestAccuracy,
      fastestTime,
      attempts: results.length,
      wins,
      gameProgress,
      gameStats,
      recentResults: results.slice(0, 8).map(serializeResult),
    }),
  );
});

export default router;