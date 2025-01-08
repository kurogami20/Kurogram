import allPost from "../../data/connect.js";

const controllersList = {
  // *affichage de la page d'accueil
  async displayHome(req, res) {
    const infoPost = await allPost.query('select * from "post_info";');

    res.render("index", {
      postInfo: infoPost.rows,
    });
  },
};

export default controllersList;
