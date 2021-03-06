const express = require("express");
const catchAsync = require("../utils/catchAsync");
const users = require("../controllers/users");
const passport = require("passport");

const router = express.Router();

router.get("/register", users.renderRegister);

router.post("/register", catchAsync(users.register));

router.get("/login", users.renderLogin);

router.post("/login", passport.authenticate("local", {failureFlash: true, failureRedirect: "login" }), users.login);

router.get("/logout", users.logout);

module.exports = router;