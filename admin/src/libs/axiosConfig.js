import axios from "axios";
import api from "./api.js"
// const api = "https://auth-app-ie66.onrender.com/api/v1/user"
// const api = "http://localhost:3000/api";
// const api = "https://music-studio-api.onrender.com/api";

const axiosConfig = axios.create({
	baseURL: api,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 30000,
});

export default axiosConfig;