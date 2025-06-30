import { Router } from "express";
import menuController from "../controllers/menu.controller.js";

const route = Router();

route.get("/get-all-menu", menuController.getAllMenu);
route.post("/create- menu", menuController.createMenu);
route.put("/update-menu", menuController.updateMenu);
route.delete("/delete-menu", menuController.deleteMenu);

export default route;
