require('dotenv').config();
const mongoose = require('mongoose');

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log(">>> Kết nối Database thành công!");
    } catch (error) {
        console.log(">>> Lỗi kết nối DB:", error);
    }
}
module.exports = connection;