const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
var cookieSession = require("cookie-session");
require("./passport");

app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(
  cookieSession({
    name: "tutor-session",
    keys: ["key1", "key2"],
  })
);

app.use(passport.initialize());
app.use(passport.session());

const isLoggedin = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).send("You are not logged in");
  }
};

app.get("/", (req, res) => {
  if (req.user) {
    res.send("you already logged in");
  } else {
    res.send("You are not logged in");
  }
});

app.get("/failed", (req, res) => {
  res.send("You are failed to logged in");
});

app.get("/send_mails", isLoggedin, (req, res) => {
  res.send(`Welcome ${req.user.emails[0].value}!`);
});

app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  function (req, res) {
    res.redirect("/send_mails");
  }
);

app.get("/logout", isLoggedin, (req, res) => {
  (req.session = null), req.logout(), res.redirect("/");
});
app.listen(5000, () => {
  console.log("Server is running");
});
