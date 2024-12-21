import postInfo from "../../data/posts.json" with { type: "json" };


const controllersList = {
  displayHome(req, res) {
    res.render("index",{
      postInfo
    });

  },
};

export default controllersList;
