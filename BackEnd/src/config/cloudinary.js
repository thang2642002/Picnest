import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: "dktvrhmka",
  api_key: "892462486891636",
  api_secret: "Xudd6aWYWKggy3PvRoCw056xCAs",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "picnest_images",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

export { cloudinary, upload };
