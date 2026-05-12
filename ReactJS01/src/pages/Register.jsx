import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../util/axios.customize';

const Register = () => {
    // Khởi tạo các state để lưu trữ dữ liệu người dùng nhập vào
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Sử dụng useNavigate để chuyển trang sau khi đăng ký thành công
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Ngăn chặn hành vi reload trang mặc định của form

        try {
            // Gửi request POST tới endpoint /register của Backend
            const res = await axios.post('/register', {
                name: name,
                email: email,
                password: password
            });

            // Backend trả về EC = 0 nghĩa là không có lỗi (Error Code = 0)
            if (res && res.EC === 0) {
                alert('Đăng ký thành công! Hệ thống sẽ chuyển tới trang Đăng nhập.');
                navigate('/login'); // Chuyển hướng người dùng sang trang Login
            } else {
                // Hiển thị thông báo lỗi từ Backend (ví dụ: "Email đã tồn tại!")
                alert(res.EM || 'Lỗi đăng ký!');
            }
        } catch (error) {
            console.error("Lỗi:", error);
            alert('Có lỗi xảy ra khi kết nối đến server API');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Đăng ký tài khoản mới</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '15px' }}>
                <input
                    type="text"
                    placeholder="Họ và tên"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{ padding: '8px' }}
                />
                <input
                    type="email"
                    placeholder="Địa chỉ Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ padding: '8px' }}
                />
                <input
                    type="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ padding: '8px' }}
                />
                <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>Đăng ký</button>
            </form>
        </div>
    );
};

export default Register;