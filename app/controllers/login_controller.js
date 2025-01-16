import data from "../models/data_mapper.js";

const controllerLogList = {
  // *affichage de la page de login
  async displaylogin(req, res) {
    res.render("login", {
      userInfo: "css",
    });
  },

  // *vérifivation des information du formulaire de login
  checkLogin(req, res, next) {
    async function log() {
      // *on récupère les donnée de user
      const info = req.body;

      // *On vérifie les donnée par rapport a la db
      const namePass = await data.correctUser(info.name, info.password);

      try {
        // *si username a une valeur on connecte l'user
        const userNameDb = namePass.rows[0].name;
        req.session.username = [];
        req.session.username.push(userNameDb);

        res.redirect(`/connected/${req.session.username[0]}`);
      } catch (error) {
        // *message d'erreur
        if (info.name === "" || info.password === "" || info === "") {
          res.render("login", {
            userInfo: "css",
            errorLog: "Veuillez bien renseigner tous les champs.",
          });
        } else {
          res.render("login", {
            userInfo: "css",
            errorLog: "Mot de passe et/ou nom d'utilisateur incorrect ",
          });
          return;
        }
      }
    }
    log();
  },

  // *page d'accueil quand l'utilisateur est connecté
  async displayHomeConnected(req, res) {
    const userName = req.session.username[0];

    const info = await data.userConnected(userName);

    const infoPost = await data.infoPost();

    res.render("connected/index_connected", {
      postInfo: infoPost,
      connected: "link",
      userName,
      info,
    });
  },
  // *page du compte de l'utilisateur
  async displayAccount(req, res) {
    const accountName = req.session.username;

    const user = await data.userAccount(accountName[0]);
    const photo = await data.accountPhoto(accountName[0]);

    res.render("connected/account", {
      user,
      inAccount: "no photo",
      photo,
    });
  },

  // *page de création de compte
  displayCreateAccount(req, res) {
    res.render("create_account", { create: "css" });
  },
  // *vérifivation des information du formulaire de création de compte
  async displayCreateAccountverify(req, res) {
    const info = req.body;
    console.log(info);
    if (info.name === "" || info.password === "") {
      res.render("create_account", {
        userInfo: "css",
        create: "css",
        errorLog: "Veuillez bien renseigner tous les champs obligatoires.",
      });
    } else {
      // * on récupère les donnée fournie dans un objet
      // *ajout des donnée dans la table all_user
      data.userInfo(info.name, info.password, info.photo);

      res.redirect("/login");
    }
  },

  logout(req, res) {
    req.session.username = [];
    res.redirect("/");
  },
};

export default controllerLogList;
