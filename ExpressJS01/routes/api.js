const express = require('express');
const { createUser, handleLogin, getHomepage, handleForgotPassword, handleResetPassword } = require('../controllers/userController');
const auth = require('../middleware/auth');

const routerAPI = express.Router();

routerAPI.get("/", getHomepage);
routerAPI.post("/register", createUser);
routerAPI.post("/login", handleLogin);
routerAPI.post("/forgot-password", handleForgotPassword);
routerAPI.post("/reset-password", handleResetPassword);
// Khóa API cần token
routerAPI.get("/user", auth, (req, res) => {
    res.status(200).json({ message: "Dữ liệu mật", user: req.user });
});

module.exports = routerAPI;