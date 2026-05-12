require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const saltRounds = 10;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const createUserService = async (name, email, password) => {
    try {
        const existUser = await User.findOne({ email });
        if (existUser) return { EC: 1, EM: "Email đã tồn tại!" };

        const hashPassword = await bcrypt.hash(password, saltRounds);
        let result = await User.create({ name, email, password: hashPassword, role: "User" });
        return { EC: 0, EM: "Đăng ký thành công", data: result };
    } catch (error) {
        return { EC: -1, EM: "Lỗi Server" };
    }
}

const loginService = async (email, password) => {
    try {
        const user = await User.findOne({ email: email });
        if (!user) return { EC: 1, EM: "Email không tồn tại" };

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return { EC: 2, EM: "Email/Password không hợp lệ" };

        const payload = { email: user.email, name: user.name, role: user.role };
        const access_token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

        return { EC: 0, access_token, user: payload };
    } catch (error) {
        return { EC: -1, EM: "Lỗi Server" };
    }
}

const forgotPasswordService = async (email) => {
    try {
        const user = await User.findOne({ email });
        if (!user) return { EC: 1, EM: "Email không tồn tại trong hệ thống!" };

        const resetToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '15m' });
        const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Khôi phục mật khẩu - Đồ án ReactJS & Node.js',
            html: `<p>Xin chào ${user.name},</p>
                   <p>Bạn đã yêu cầu đặt lại mật khẩu. Vui lòng click vào link dưới đây để đặt lại (Link có hiệu lực 15 phút):</p>
                   <a href="${resetLink}">Khôi phục mật khẩu</a>`
        };

        await transporter.sendMail(mailOptions);
        return { EC: 0, EM: "Đã gửi link khôi phục vào email của bạn!" };
    } catch (error) {
        return { EC: -1, EM: "Lỗi Server khi gửi email" };
    }
};

const resetPasswordService = async (token, newPassword) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const hashPassword = await bcrypt.hash(newPassword, saltRounds);
        await User.findOneAndUpdate({ email: decoded.email }, { password: hashPassword });
        return { EC: 0, EM: "Đặt lại mật khẩu thành công!" };
    } catch (error) {
        return { EC: 1, EM: "Token không hợp lệ hoặc đã hết hạn!" };
    }
};

module.exports = { createUserService, loginService, forgotPasswordService, resetPasswordService };