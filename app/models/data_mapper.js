import search from "../controllers/left_menu_controller.js";
import data from "../models/connect.js";

const dataMapper = {
  // * index related

  async allPost() {
    const posts = await data.query("select * from post_info");
    return posts.rows;
  },

  async infoPost() {
    const dataPost = await data.query(
      ` select p.*, a.name, a.photo
        from all_user_info a 
        join post_info p on a.id  = p.id_user 
        order by p.id desc;
      ;`
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
      `select u.*, a.name, a.photo
      from all_user_info a
      join user_account_info u on a.id  = u.id_user 
       where "name"=$1;`,
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
  async accountInfo(id) {
    const account = await data.query(
      `INSERT INTO "user_account_info" ("id_user","user_posts_number","user_followers","user_followings") VALUES
  ($1,0,0,0);
  `,
      [id]
    );
    return account;
  },
  // dans la page account pour trouver tous les posts de l'user
  async accountPhoto(name) {
    const photoList = await data.query(
      `select p.user_post, a.name
      from all_user_info a
      join post_info p on a.id  = p.id_user 
      where a.name=$1 
      order by p.id desc;`,
      [name]
    );
    return photoList.rows;
  },
  // *post related
  async likesPost(idPost) {
    const likes = await data.query("SELECT likes FROM post_info WHERE id=$1;", [
      idPost,
    ]);
    return likes[0].likes;
  },

  async updateLikes(idPost) {
    const likesNb = data.query(
      `update post_info set likes = likes + 1  where id = $1;`,
      [idPost]
    );
    return postNb;
  },
  // * post related

  async updateNb(userName) {
    const postNb = data.query(
      `update user_account_info set user_posts_number = user_posts_number + 1  where id_user = $1;`,
      [userName]
    );
    return postNb;
  },
  async newPost(id, photoInfo) {
    const post = data.query(
      `
  INSERT INTO "post_info" ("id_user", "user_post", "post_description", "likes") VALUES
  ($1,$2,$3,0);
  `,
      [id, photoInfo.post, photoInfo.description]
    );
  },

  async searchUser(name) {
    const users = await data.query(
      `select * from all_user_info
      where name LIKE $1
      order by name;
    `,
      [name]
    );
    return users.rows;
  },
};

export default dataMapper;
