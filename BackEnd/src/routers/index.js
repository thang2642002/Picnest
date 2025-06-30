import { Router } from "express";
import imagesRouter from "./images.router.js";
const router = Router();
router.use("/images", imagesRouter);

export default router;
