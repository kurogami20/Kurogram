import user_info from "../models/connect.js";
import account_info from "../models/connect.js";
import post_info from "../models/connect.js";

const controllersPostList = {
  // *publication d'image
  async displayPublication(req, res) {
    const userName = req.params.userName;
    const info = await user_info.query(
      `select * from all_user_info where name = '${userName}'`
    );
    res.render("connected/publication", {
      stylePublicate: "css",
      info: info.rows[0],
    });
  },

  async handlePublication(req, res) {
    const userName = req.params.userName;
    const infoUser = await user_info.query(
      `select * from all_user_info where name = '${userName}'`
    );
    const info = infoUser.rows[0];

    const publiPhoto = req.body;

    if (publiPhoto.post !== "") {
      // *on augamente le compteur de publi de user
      account_info.query(
        `update user_account_info set user_posts_number = COALESCE(user_posts_number, 0) + 1  where user_name = '${userName}';`
      );

      const nb = await account_info.query(
        `select * from user_account_info where user_name = '${userName}';`
      );
      console.log(nb.rows);

      const idUser = await user_info.query(
        `select id from all_user_info where name='${info.name}'`
      );

      post_info.query(`
  INSERT INTO "post_info" ("id_user","user_name", "user_photo", "user_post", "post_description", "likes") VALUES
  ('${idUser.rows[0].id}','${info.name}','${info.photo}','${publiPhoto.post}','${publiPhoto.description}', 0);
  `);

      res.redirect(`/connected/${info.name}`);
    } else {
      res.render("connected/publication", {
        stylePublicate: "css",
        info,
        errorLog: "Veuillez mettre une image.",
      });
    }
  },
};

export default controllersPostList;
