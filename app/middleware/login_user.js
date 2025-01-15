async function loginUser(req, res, next) {
  if (!req.session.username) {
    req.session.username = [];
  }
  console.log(req.session.username);
  next();
}
export default loginUser;
