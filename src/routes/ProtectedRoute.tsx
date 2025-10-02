import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "src/context/AuthContext";


export default function ProtectedRoute() {
    const { user } = useAuth(); 
    const location = useLocation();

    if (!user) {
        return <Navigate to="/welcome" state={{ from: location }} replace />;
    }

}