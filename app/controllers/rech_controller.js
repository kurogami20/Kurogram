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
};
export default search;
