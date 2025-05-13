const express = require("express");
const path = require("path");
const methodOverride = require("method-override");

configEngine = (app) => {
  // Middleware to parse JSON
  console.log(
    "View engine configured with EJS and static files served from public directory.",
    path.join(__dirname, "./views")
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "../views"));
  app.use(methodOverride("_method"));

  // Middleware to serve static files
  app.use(express.static(path.join(__dirname, "../public")));
};

module.exports = configEngine;
