const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "369068377854-u9c35a3tlkqg2g0u254depjv3oecmq8v.apps.googleusercontent.com",
      clientSecret: "B8389TKcqYlNRETZCj0VlEYo",
      callbackURL: "http://localhost:5000/google/callback",
    },
    function (token, tokenSecret, profile, done) {
      return done(null, profile);
    }
  )
);
