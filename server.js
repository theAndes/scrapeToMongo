//Express is a minimal and flexible Node.js web application framework that provides a robust
//set of features for web and mobile applications.
const express = require("express");
const exphbs = require("express-handlebars");
//Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
const mongoose = require("mongoose");

//Morgan is a HTTP request logger middleware for node.js
const logger = require("morgan");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
//Cheerio implements a subset of core jQuery.
//Cheerio removes all the DOM inconsistencies and browser cruft from the jQuery library, revealing its truly gorgeous API
const axios = require("axios");
const cheerio = require("cheerio");

// Require all models
const db = require("./models");

const PORT = process.env.PORT || 3000;

// Initialize Express
const app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB

// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoStuff";
// mongoose.connect(MONGODB_URI);
mongoose.connect("mongodb://localhost/mongoDataBase", {
  useNewUrlParser: true
});

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");


// Routes
require("./routes/apiRoutes")(app,axios,cheerio);
require("./routes/htmlRoutes")(app);

//Start and listen
app.listen(PORT, function() {
  console.log(
    "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT
  );
});

module.exports = app;
