import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from '../util/axios.customize';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Lấy token từ URL
    const token = searchParams.get('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/reset-password', { token, newPassword });
            if (res && res.EC === 0) {
                alert('Đặt lại mật khẩu thành công! Vui lòng đăng nhập lại.');
                navigate('/login');
            } else {
                alert(res.EM || 'Lỗi khôi phục');
            }
        } catch (error) {
            alert('Lỗi hệ thống');
        }
    };

    if (!token) return <div style={{ padding: '20px' }}>Đường dẫn không hợp lệ!</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Tạo mật khẩu mới</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '15px' }}>
                <input
                    type="password"
                    placeholder="Nhập mật khẩu mới"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    style={{ padding: '8px' }}
                />
                <button type="submit" style={{ padding: '10px' }}>Lưu mật khẩu</button>
            </form>
        </div>
    );
};

export default ResetPassword;