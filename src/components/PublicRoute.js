import { useAuth } from "../contexts/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

export default function PubliceRoute({ children }) {

    const { currentUser } = useAuth();

    return !currentUser ? <Outlet /> : <Navigate to="/" />;

}