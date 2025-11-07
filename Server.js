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
app.use(
  cors({
    origin: [
      "https://orderuk-food-dilevery-application.netlify.app", // ✅ your Netlify domain
      "http://localhost:3000" // ✅ for local testing
    ],
    credentials: true,
  })
);

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
