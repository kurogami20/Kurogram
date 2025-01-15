import express from "express";
import mainController from "./controllers/main_controller.js";
import loginController from "./controllers/login_controller.js";
import postController from "./controllers/post_controller.js";
import otherAccountController from "./controllers/otherAccount_controller.js";
import error404 from "./middleware/404.js";
import loginUser from "./middleware/login_user.js";
import search from "./controllers/rech_controller.js";

const router = express.Router();

router.use(loginUser);

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
router.get("/:userName/publicate", postController.displayPublication);
router.post("/:userName/publicate", postController.handlePublication);

// *voir d'autres comptes
router.get(
  "/check/:user/:user_check",
  otherAccountController.displayChackedAccount
);

// *reherche d'autre compte
router.get("/:user/search", search.displaySearch);

router.get("/log_out", loginController.logout);
// *404
router.use(error404.display404);
export default router;
