import { Router } from "express";
import menuController from "../controllers/menu.controller.js";

const route = Router();

route.get("/get-all-menu", menuController.getAllMenu);
route.post("/create-menu", menuController.createMenu);
route.put("/update-menu/:menu_id", menuController.updateMenu);
route.delete("/delete-menu/:menu_id", menuController.deleteMenu);

export default route;
