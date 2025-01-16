import data from "../models/data_mapper.js";

const account = {
  async displayChackedAccount(req, res) {
    const infoCheck = req.params.user_check;

    const userName = req.session.username[0];

    const user = await data.userAccount(infoCheck);

    const photo = await data.accountPhoto(infoCheck);

    const info = await data.userConnected(userName);

    console.log(info);
    if (userName === infoCheck) {
      res.render("check_account", {
        userName,
        user,
        info,
        photo,
        inAccount: "inaccount",
      });
    } else {
      res.render("check_account", {
        userName,
        user,
        info,
        photo,
      });
    }
  },
};
export default account;
