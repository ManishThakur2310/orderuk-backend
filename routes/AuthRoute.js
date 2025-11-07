const express = require("express");
const router = express.Router();


const { Signup, Login, Logout } = require("../controllers/Auth.js")


// ------------------- Signup -------------------
router.post("/signup", Signup);


// // ------------------- Login -------------------
router.post("/login", Login);

// // ------------------- Logout -------------------
router.post("/logout", Logout);


module.exports = router;
