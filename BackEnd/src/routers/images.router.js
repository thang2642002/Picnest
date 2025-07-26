import { Router } from "express";
import imageController from "../controllers/images.controller.js";
import { upload } from "../config/cloudinary.js";
const route = Router();

route.get("/get-all-images", imageController.getAllImage);
route.post(
  "/create-images",
  upload.array("images", 10),
  imageController.createImage
);
route.put(
  "/update-image/:image_id",
  upload.single("url"),
  imageController.updateImage
);
route.delete("/delete-image/:image_id", imageController.deleteImage);

export default route;
