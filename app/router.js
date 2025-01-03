import express from "express";
import mainController from "./controllers/main_controller.js";

const router = express.Router();
// *accueil
router.get("/", mainController.displayHome);

// *login
router.get("/login", mainController.displaylogin);
router.post("/login", mainController.checkLogin);

router.get("/connected/:userName", mainController.displayHomeConnected);
// *compte
router.get("/login/account/:accountName", mainController.displayAccount);

// *creer son compte
router.get("/login/account_creation", mainController.displayCreateAccount);
router.post(
  "/login/account_creation",
  mainController.displayCreateAccountverify
);

export default router;
