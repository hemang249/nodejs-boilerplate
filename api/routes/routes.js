const express = require("express");
const router = express.Router();

const {
  isLoggedIn,
  loginController,
  registerController,
  signoutController,
  isAdmin,
  isAuthenticated,
} = require("../controllers/auth");

/* AUTH ROUTES  */
router.post("/login", loginController);
router.post("/register", registerController);
router.post("/logout", signoutController);

module.exports = router;
