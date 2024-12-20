import express from "express";
import router from "./app/router.js";

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", ".//views");

app.use(express.static("public"));

app.use(router);

app.listen(3000, () => {
  console.log("server started go to http://localhost:3000");
});
