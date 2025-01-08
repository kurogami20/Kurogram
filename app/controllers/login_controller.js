import user_info from "../../data/connect.js";
import allPost from "../../data/connect.js";
import account_info from "../../data/connect.js";

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
      const namePass = await user_info.query(
        `select name from all_user_info where name='${info.name}' and password='${info.password}' `
      );

      try {
        // *si username a une valeur on connecte l'user
        const userNameDb = namePass.rows[0].name;
        res.redirect(`/connected/${userNameDb}`);
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
    const userName = req.params.userName;

    const info = await user_info.query(
      `select * from "all_user_info" where "name"='${userName}';`
    );
    const infoPost = await allPost.query(
      'SELECT * FROM "post_info" ORDER BY id DESC;'
    );

    console.log(userName);

    res.render("index_connected", {
      postInfo: infoPost.rows,
      connected: "link",
      userName: userName,
      info: info.rows[0],
    });
  },
  // *page du compte de l'utilisateur
  async displayAccount(req, res) {
    const accountName = req.params.accountName;

    const user = await account_info.query(
      `select * from user_account_info where "user_name"='${accountName}'`
    );
    console.log(user.rows);
    res.render("account", {
      user: user.rows[0],
      inAccount: "no photo",
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
      user_info.query(`INSERT INTO "all_user_info" ("name","password","photo") VALUES
  ('${info.name}','${info.password}','${info.photo}');
  `);

      const idUser = await user_info.query(
        `select id from all_user_info where name='${info.name}'`
      );

      account_info.query(`INSERT INTO "user_account_info" ("id_user","user_name","user_posts_number","user_followers","user_followings", "user_photo") VALUES
  ('${idUser.rows[0].id}','${info.name}',0,0,0,'${info.photo}');
  `);

      res.redirect("/login");
    }
  },
};

export default controllerLogList;
