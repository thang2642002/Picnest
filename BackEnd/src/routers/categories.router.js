import { Router } from "express";
import categoriesController from "../controllers/categories.controller.js";
const route = Router();

route.get("/get-all-categories", categoriesController.getAllCategories);
route.post("/create-categories", categoriesController.createCategories);
route.put(
  "/update-categories/:categories_id",
  categoriesController.updateCategories
);
route.delete(
  "/delete-categories/:categories_id",
  categoriesController.deleteCategories
);

export default route;
