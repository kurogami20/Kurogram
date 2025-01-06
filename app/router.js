import express from "express";
import mainController from "./controllers/main_controller.js";
import loginController from "./controllers/login_controller.js";
import postController from "./controllers/post_controller.js";
import error404 from "./middleware/404.js";

const router = express.Router();
// *accueil
router.get("/", mainController.displayHome);

// *login
router.get("/login", loginController.displaylogin);
router.post("/login", loginController.checkLogin);

router.get("/connected/:userName", loginController.displayHomeConnected);
// *compte
router.get("/login/account/:accountName", loginController.displayAccount);

// *creer son compte
router.get("/login/account_creation", loginController.displayCreateAccount);
router.post(
  "/login/account_creation",
  loginController.displayCreateAccountverify
);

// *publication
router.get("/connected/publicate/:userName", postController.displayPublication);
router.post("/connected/publicate/:userName", postController.handlePublication);

// *404
router.use(error404.display404);
export default router;
