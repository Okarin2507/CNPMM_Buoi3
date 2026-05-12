const { createUserService, loginService, forgotPasswordService, resetPasswordService } = require('../services/userService');

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ EM: "Thiếu dữ liệu" }); // Validate cơ bản từ slide bảo mật

    let data = await createUserService(name, email, password);
    return res.status(200).json(data);
}

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    let data = await loginService(email, password);
    return res.status(200).json(data);
}

const getHomepage = (req, res) => res.status(200).json("Nguyễn Hữu Trung! Hello world! HomePage API"); // Theo ảnh 62
const handleForgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ EM: "Vui lòng nhập Email" });

    let data = await forgotPasswordService(email);
    return res.status(200).json(data);
};

const handleResetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) return res.status(400).json({ EM: "Thiếu dữ liệu" });

    let data = await resetPasswordService(token, newPassword);
    return res.status(200).json(data);
};

module.exports = { createUser, handleLogin, getHomepage, handleForgotPassword, handleResetPassword };