import express from "express";
import router from "./app/router.js";
import session from "express-session";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "a_R3al_pa22wOrd",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.set("view engine", "ejs");
app.set("views", "./app/views");

app.use(express.static("public"));

app.use(router);

app.listen(3000, () => {
  console.log("server started go to http://localhost:3000");
});
