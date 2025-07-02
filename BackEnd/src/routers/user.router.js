import { Router } from "express";
import userController from "../controllers/user.controller.js";

const route = Router();

route.get("/get-all-user", userController.getAllUser);
route.post("/create-user", userController.createUser);
route.put("/update-user/:user_id", userController.updateUser);
route.delete("/delete-user/:user_id", userController.deleteUser);

export default route;
