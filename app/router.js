import express from "express";
import mainController from "./controllers/main_controller.js";

const router = express.Router();

router.get("/", mainController.displayHome);
router.get("/login", mainController.displaylogin);
router.post("/login", mainController.displayHomeConnected);
export default router;
