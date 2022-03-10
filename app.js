const express = require("express");
const app = express();
require("dotenv").config();

const { auth, requiresAuth } = require("express-openid-connect");

app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    secret: process.env.SECRET,
  })
);

app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

// const { auth } = require("express-openid-connect");

// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   baseURL: "http://localhost:3000",
//   clientID: "BcrlibLDw2WWGtNfaiNt5QAiVqszpB4b",
//   issuerBaseURL: "https://dev-68vge8o4.us.auth0.com",
//   secret: "KuRC6fpRGDvV8XT3EW-tBQbGkjhZyoZkPDsheJdl_aYjuwffMuNSfrkzCJJXvdx1",
// };

// auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(config));

// req.isAuthenticated is provided from the auth router
// app.get("/", (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Listening on port " + port);
});
