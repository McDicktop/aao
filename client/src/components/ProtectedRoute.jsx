import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const { token, user } = useSelector((state) => state.auth);

    // Проверяем наличие токена и роль пользователя
    if (!token || user.role !== 'admin') {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;