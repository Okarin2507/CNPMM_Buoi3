import { useState } from 'react';
import axios from '../util/axios.customize';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/forgot-password', { email });
            alert(res.EM); // Sẽ hiện: "Đã gửi link khôi phục..."
        } catch (error) {
            alert('Lỗi khi gửi yêu cầu');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Quên mật khẩu</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '15px' }}>
                <input
                    type="email"
                    placeholder="Nhập email của bạn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ padding: '8px' }}
                />
                <button type="submit" style={{ padding: '10px' }}>Gửi link khôi phục</button>
            </form>
        </div>
    );
};

export default ForgotPassword;