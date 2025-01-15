import data from "../models/data_mapper.js";

const controllersPostList = {
  // *publication d'image
  async displayPublication(req, res) {
    const userName = req.session.username[0];

    const info = await data.userConnected(userName);
    res.render("connected/publication", {
      stylePublicate: "css",
      info,
    });
  },

  async handlePublication(req, res) {
    const userName = req.session.username[0];
    const info = await data.userConnected(userName);
    console.log(info.id);
    const publiPhoto = req.body;

    if (publiPhoto.post !== "") {
      // *on augamente le compteur de publi de user
      // const nb = await data.userAccount(userName);
      // console.log(nb.rows);

      await data.newPost(info.id, publiPhoto);
      await data.updateNb(info.id);

      res.redirect(`/connected/${userName}`);
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
