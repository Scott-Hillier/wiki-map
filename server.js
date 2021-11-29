// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const cookieSession = require("cookie-session");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();
// const dbConnection = require("./db/database");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "session",
    keys: ["super", "duper"],
  })
);

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

const usersRoutes = require("./routes/users.route");
const mapsRoutees = require("./routes/maps.route");
const pointsRoutees = require("./routes/points.route");
const profilesRoutees = require("./routes/profiles.route");

const userDataHelper = require("./db-helper/user.helper");
const { getUserWithUserId } = userDataHelper(db);

// Mount all resource routes
app.use("/api/users", usersRoutes(db));
app.use("/api/maps", mapsRoutees(db));
app.use("/api/points", pointsRoutees(db));
app.use("/api/profiles", profilesRoutees(db));

// Home page
app.get("/", (req, res) => {
  if (!req.session.userId) {
    return res.render("index", { user: null });
  }
  getUserWithUserId(req.session.userId).then((user) => {
    console.log(user);
    res.render("index", { user: user });
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
