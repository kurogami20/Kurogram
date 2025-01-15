import data from "../models/data_mapper.js";

const account = {
  async displayChackedAccount(req, res) {
    const info = req.params;

    const user = await data.userAccount(info.user_check);
    const checkingAccount = await data.userAccount(info.user);
    const photo = await data.accountPhoto(info.user_check);
    console.log(info);
    if (info.user === info.user_check) {
      res.render("check_account", {
        user,
        who: req.session.username,
        checkingAccount,
        photo,
        inAccount: "inaccount",
      });
    } else {
      res.render("check_account", {
        user,
        who: req.session.username,
        checkingAccount,
        photo,
      });
    }
  },
};
export default account;
`
  select client.email
  from client 
  join order on(order.client=client.id)
  where order.total = max(order.total)

`;
