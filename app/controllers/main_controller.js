import postInfo from "../../data/posts.json" with { type: "json" };


const controllersList = {
  // *affichage de la page d'accueil
  displayHome(req, res) {
    res.render("index",{
      postInfo
    });

  },


};

export default controllersList;
