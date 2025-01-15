import data from "../models/data_mapper.js";

const controllersList = {
  // *affichage de la page d'accueil
  async displayHome(req, res) {
    const postInfo = await data.infoPost();

    res.render("index", {
      postInfo,
    });
  },
};

export default controllersList;
