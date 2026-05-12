import axios from "axios";

// Tạo một instance của Axios
const instance = axios.create({
    baseURL: 'http://localhost:8080/v1/api/',
    timeout: 5000,
});

// Thêm interceptor cho request để tự động gắn Token
instance.interceptors.request.use(function (config) {
    // Lấy token từ localStorage
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Thêm interceptor cho response để bóc tách dữ liệu
instance.interceptors.response.use(function (response) {
    return response.data; // Chỉ lấy phần data trả về từ Backend
}, function (error) {
    return Promise.reject(error);
});

export default instance;