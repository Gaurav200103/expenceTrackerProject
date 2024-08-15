const express = require("express");
const { addUser, loginUser, forgotPassword, resetPassword } = require("../controller/user.controller");
const router = express.Router();


router.post("/singup", addUser);

router.post("/login", loginUser);

router.post("/password/forgotpassword", forgotPassword);

router.get("/password/resetPassword/:uid", resetPassword);

module.exports = router;