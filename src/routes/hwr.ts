import { Router } from "express";
import { HwrController } from "../controllers/HwrController";

export const hwrRoute = Router();

// Point text route to MyScript Controller's text action
hwrRoute.get("/text", HwrController.text);
