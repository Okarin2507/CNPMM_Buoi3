import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../util/axios.customize';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/login', { email, password });

            if (res && res.EC === 0) {
                // Lưu token vào trình duyệt
                localStorage.setItem('access_token', res.access_token);
                // Lưu thông tin vào Context
                setAuth({ isAuthenticated: true, user: res.user });
                alert('Đăng nhập thành công!');
                navigate('/'); // Chuyển về trang chủ
            } else {
                alert(res.EM || 'Lỗi đăng nhập');
            }
        } catch (error) {
            console.error("Lỗi:", error);
            alert('Có lỗi xảy ra kết nối API');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Đăng nhập</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '10px' }}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Xác nhận</button>
                <div style={{ marginTop: '10px' }}>
                    <Link to="/forgot-password" style={{ color: '#007bff', textDecoration: 'none' }}>Quên mật khẩu?</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;