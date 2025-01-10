import data from "../models/data_mapper.js";

const account = {
  async displayChackedAccount(req, res) {
    const info = req.params;

    const user = await data.userAccount(info.user_check);
    const checkingAccount = await data.userAccount(info.user);
    console.log(info);
    res.render("check_account", {
      user,
      who: info.user,
      checkingAccount,
    });
  },
};
export default account;
