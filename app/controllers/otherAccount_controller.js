import data from "../models/data_mapper.js";

const account = {
  async displayChackedAccount(req, res) {
    const info = req.params;

    const user = await data.userAccount(info.user_check);
    const checkingAccount = await data.userAccount(info.user);
    const photo = await data.accountPhoto(info.user_check);
    console.log(info);
    res.render("check_account", {
      user,
      who: info.user,
      checkingAccount,
      photo,
    });
  },
};
export default account;
