import { Router } from "express";
import contactController from "../controllers/contact.controller.js";
const route = Router();

route.get("/get-all-contact", contactController.getAllContact);
route.post("/create-contact", contactController.createContact);
route.delete("/delete-contact", contactController.deleteContact);

export default route;
