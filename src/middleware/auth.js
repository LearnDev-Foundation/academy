/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/store";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import toast from "react-hot-toast";


export const AuthorizeUser = ({ children }) => {
	const token = localStorage.getItem("token");
	const navigate = useNavigate();
	

	useEffect(() => {
		if (!token) {
			toast.error("Please login to continue");
			navigate("/username");
		} else if (token) {
			const decoded = jwt_decode(token);
			const currentTime = Date.now() / 1000;
			if (decoded.exp < currentTime) {
				localStorage.removeItem("token");
				toast.error("Session expired, please login again");
				navigate("/username");
			}
		}
	}, [navigate, token]);
    
	return token ? children : null;
    
};

export const ProtectRoute = ({ children }) => {
	const username = useAuthStore.getState().auth.username;
	const navigate = useNavigate();

	useEffect(() => {
		if (!username) {
			toast.error("Please input your username to continue");
			navigate("/username");
		}
	}, [navigate, username]);
      
	return username ? children : null;
};