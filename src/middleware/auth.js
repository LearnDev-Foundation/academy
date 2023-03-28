import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/store";
import { useEffect } from "react";

export const AuthorizeUser = ({ children }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if(!token){
            navigate('/username');
        }else {
            return children;
        }
    }, []);
    
}

export const ProtectRoute = ({ children }) => {
    const username = useAuthStore.getState().auth.username;
    const navigate = useNavigate();

    useEffect(() => {
        if(!username){
            navigate('/username');
        }else {
            return children;
        }
    }, []);
}