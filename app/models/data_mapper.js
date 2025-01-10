import data from "../models/connect.js";

const dataMapper = {
  // * index related
  async infoPost() {
    const dataPost = await data.query(
      'SELECT * FROM "post_info" ORDER BY id DESC;'
    );
    return dataPost.rows;
  },

  // *login related
  // verifie l'id de l'user
  async correctUser(userName, password) {
    const user = await data.query(
      `select name from all_user_info where name=$1 
        and password=$2 `,
      [userName, password]
    );
    return user;
  },

  // montre la page d'accueil connecté
  async userConnected(userName) {
    const check = await data.query(
      `select * from "all_user_info" where "name"=$1;`,
      [userName]
    );
    return check.rows[0];
  },
  // pour la page compte de user connecté
  async userAccount(userName) {
    const check = await data.query(
      `select * from "user_account_info" where "user_name"=$1;`,
      [userName]
    );
    return check.rows[0];
  },
  // creation de compte (ajout)
  // dans all_user_info
  async userInfo(name, password, photo) {
    const user = await data.query(
      `INSERT INTO "all_user_info" ("name","password","photo") VALUES
  ($1,$2,$3);`,
      [name, password, photo]
    );
    return user;
  },
  // dans user_account
  async accountInfo(id, name, photo) {
    const account = await data.query(
      `INSERT INTO "user_account_info" ("id_user","user_name","user_posts_number","user_followers","user_followings", "user_photo") VALUES
  ($1,$2,0,0,0,$3);
  `,
      [id, name, photo]
    );
    return account;
  },
  // *post related
  async likesPost(idPost) {
    const likes = await data.query("SELECT likes FROM post_info WHERE id=$1;", [
      idPost,
    ]);
  },
};

export default dataMapper;
