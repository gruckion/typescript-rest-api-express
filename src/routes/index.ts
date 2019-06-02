import { Router } from "express";
import { hwrRoute } from "./hwr";

export const routes = Router();

// Respond to all routes with text
routes.use("/hwr", hwrRoute);
