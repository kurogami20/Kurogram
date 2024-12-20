import express from "express";
import mainController from "./controllers/main_controller.js";

const router = express.Router();

router.get("/", mainController.displayHome);

export default router;
