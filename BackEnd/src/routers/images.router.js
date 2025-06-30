import { Router } from "express";
import imageController from "../controllers/images.controller.js";
const route = Router();

route.get("/get-all-image", imageController.getAllImage);
route.post("/create-image", imageController.createImage);
route.post("/update-image", imageController.updateImage);
route.delete("/delete-image", imageController.deleteImage);

export default route;
