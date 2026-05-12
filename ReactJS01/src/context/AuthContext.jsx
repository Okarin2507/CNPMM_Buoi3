import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthWrapper = ({ children }) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        user: { email: "", name: "", role: "" }
    });

    useEffect(() => {
        // Kiểm tra xem có token dưới local storage không khi F5 web
        const token = localStorage.getItem('access_token');
        if (token) {
            // Trong thực tế, nên gọi 1 API /profile để lấy lại thông tin user từ token
            setAuth({ isAuthenticated: true, user: {} });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};