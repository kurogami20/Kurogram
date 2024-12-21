import express from "express";
import mainController from "./controllers/main_controller.js";

const router = express.Router();
// *accueil
router.get("/", mainController.displayHome);
// *login
router.get("/login", mainController.displaylogin);
router.post("/login", mainController.displayHomeConnected);

// *compte
router.get("/login/account/:accountName", mainController.displayAccount);
export default router;
