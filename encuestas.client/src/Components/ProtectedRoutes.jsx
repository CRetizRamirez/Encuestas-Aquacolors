import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = ({ isAuthenticated, redirectPath = '/' }) => {
    if (!isAuthenticated) {
        return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
};

export default ProtectedRoutes;

