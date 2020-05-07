const User = require("../models/User");
const jwt = require("jsonwebtoken");
const encryption = require("../helpers/encryption");
const config = require("../../config/config");
const expressJwt = require("express-jwt");

module.exports = {
  registerController: async (req, res) => {
    try {
      const { email, password } = req.body;
      const hash = encryption.encrypt(password);
      const user = new User({ email, password: hash });
      await user.save();

      res.status(200).json({
        email: user.email,
        _id: user._id,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "Unable to Create the User" });
    }
  },

  loginController: async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      const hash = encryption.encrypt(password);
      if (hash === user.password) {
        const { _id, email } = user;
        const token = jwt.sign({ _id: user._id }, config.secret);

        res
          .cookie("token", token, { expire: new Date() + 999 })
          .status(200)
          .json({
            user: { _id, email },
            token,
          });
      } else {
        res.status(401).json({ error: "Incorrect Password !" });
      }
    } catch (err) {
      console.log(err);
      res.status(404).json({ error: "No Such User Exists !" });
    }
    next();
  },

  signoutController: async (req, res, next) => {
    res.clearCookie("token");
    res.status(200).json({});
    next();
  },

  isLoggedIn: expressJwt({
    secret: config.secret,
    userProperty: "auth",
  }),

  isAuthenticated: async (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;

    if (!checker) {
      res.status(401).json({ error: "Unauthorised" });
    }

    next();
  },

  isAdmin: async (req, res, next) => {
    if (req.profile.role !== 1) {
      res.status(401).json("Unauthorised");
    }

    next();
  },
};
