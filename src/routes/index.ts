import { Router } from "express";

export const routes = Router();

// Respond to all routes with text
routes.use("/", (req, res) => res.send("Hello Express"));
