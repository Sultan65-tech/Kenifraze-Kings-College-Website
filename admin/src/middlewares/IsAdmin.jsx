import React from "react";
import useAuth from "../store/useAuth";
import { Navigate } from "react-router-dom";

const IsAdmin = ({ children }) => {
	const { admin } = useAuth();
	if (admin) {
		return children;
	}
	return <Navigate to='/' replace />;
};

export default IsAdmin;
