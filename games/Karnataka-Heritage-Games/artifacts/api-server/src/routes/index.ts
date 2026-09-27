import { Router, type IRouter } from "express";
import healthRouter from "./health";
import gameResultsRouter from "./game-results";

const router: IRouter = Router();

router.use(healthRouter);
router.use(gameResultsRouter);

export default router;
