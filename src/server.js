require("dotenv").config();
const express = require("express");
const path = require("path");
const webRoutes = require("./routes/web.js");
const configEngine = require("./config/viewEngine.js");

const app = express();

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

configEngine(app);

app.use("/", webRoutes);

// Start the server
app.listen(port, host, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
