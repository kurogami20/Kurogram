import data from "../models/data_mapper.js";
const search = {
  async displaySearch(req, res) {
    const currentUser = req.session.username;
    console.log(currentUser);
    const rech = "%" + req.query.search + "%";

    if (req.query.search !== "") {
      const searchResult = await data.searchUser(rech);
      res.render("search_page", {
        styleSearch: "css",
        searchResult,
        currentUser,
      });
    } else {
      res.render("search_page", {
        styleSearch: "css",
        searchResult: "none",
      });
    }
  },
  async displayExplore(req, res) {
    const posts = await data.infoPost();

    res.render("explore", {
      posts,
      exploreStyle: "css",
    });
  },
};
export default search;
