const express = require("express");
const router = express();
const authControllers = require("../controllers/authControllers");

// show a list of all users (no filter yet)
router.get("/", authControllers.signup_get);

router.post("/signup", authControllers.signup_post);

router.post("/login", authControllers.login_post);

module.exports = router;
