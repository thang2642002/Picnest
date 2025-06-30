import { Router } from "express";
import categoriesController from "../controllers/categories.controller.js";
const route = Router();

route.get("/get-all-categories", categoriesController.getAllCategories);
route.post("/create-categories", categoriesController.createCategories);
route.post("/update-categories", categoriesController.updateCategories);
route.delete("/delete-categories", categoriesController.deleteCategories);

export default route;
