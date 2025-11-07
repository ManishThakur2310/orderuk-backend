// server.js
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const ConnectDb = require("./configuration/ConnectDb.js");

// Initialize app
const app = express();

// ---------- Middlewares ----------
app.use(express.json()); // Parse JSON body
app.use(cookieParser());

// ✅ Enable CORS so frontend can talk to backend
app.use(cors({
  origin: "http://localhost:3000",  // frontend URL (React)
  credentials: true                 // allows cookies to be sent
}));

// ---------- Routes ----------
app.get("/", (req, res) => {
  res.send("<b>Home Page</b>");
});

// Auth routes
const Auth = require("./routes/AuthRoute.js");
app.use("/api/v1/auth", Auth);

// ---------- Database + Server ----------
const port = process.env.PORT || 4000;

ConnectDb();

app.listen(port, () => {
  console.log(`✅ Server is running at port ${port}`);
});
