import { Routes, Route } from 'react-router-dom';
import Header from './layout/Header';
import Login from './pages/Login';
import Register from './pages/Register'; // Đã chuyển về đúng thư mục pages
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
function App() {
  return (
    <div className="app-container">
      {/* Header sẽ luôn hiển thị ở mọi trang */}
      <Header />

      {/* Khu vực định tuyến nội dung chính */}
      <Routes>
        <Route path="/" element={<div style={{ padding: '20px' }}><h2>Đây là trang chủ quản trị</h2></div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* Bổ sung route Register */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;