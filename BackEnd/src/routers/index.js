import { Router } from "express";
import userRouter from "./user.router.js";
import categoriesRouter from "./categories.router.js";
import imagesRouter from "./images.router.js";
import menusRouter from "./menu.router.js";
import contactRouter from "./contact.router.js";
const router = Router();
router.use("/images", imagesRouter);
router.use("/menus", menusRouter);
router.use("/users", userRouter);
router.use("/categories", categoriesRouter);
router.use("/contacts", contactRouter);

export default router;
