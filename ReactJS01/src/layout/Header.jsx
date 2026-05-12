import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header style={{ padding: '10px 20px', background: '#f8f9fa', borderBottom: '1px solid #ddd' }}>
            <nav style={{ display: 'flex', gap: '20px' }}>
                <Link to="/">Trang chủ</Link>
                <Link to="/login">Đăng nhập</Link>
                <Link to="/register">Đăng ký</Link>
            </nav>
        </header>
    );
};

export default Header;
