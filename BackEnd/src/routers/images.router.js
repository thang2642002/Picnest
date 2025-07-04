import { Router } from "express";
import imageController from "../controllers/images.controller.js";
import { upload } from "../config/cloudinary.js";
const route = Router();

route.get("/get-all-image", imageController.getAllImage);
route.post("/create-image", upload.single("url"), imageController.createImage);
route.put(
  "/update-image/:image_id",
  upload.single("url"),
  imageController.updateImage
);
route.delete("/delete-image/:image_id", imageController.deleteImage);

export default route;
