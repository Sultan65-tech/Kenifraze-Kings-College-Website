import { create } from "zustand";
import axiosConfig from "../libs/axiosConfig";

const storedUser = JSON.parse(localStorage.getItem("allbizz-admin")) || null;
const useAuth = create((set, get) => ({
	admin: storedUser,
	isAdmin: storedUser?.role === "ADMIN" ? true : false,
	isSigningIn: false,
	isChecking: true,
	isValidating: false,
	isReseting: false,

	loginNow: async (data, showMessage, navigate) => {
		try {
			set({ isSigningIn: true });
			const res = await axiosConfig.post("/api/admin/login", data);
			if (!res?.data.success) {
				showMessage(res?.data?.message, false);
				return;
			}
			localStorage.setItem("allbizz-admin", JSON.stringify(res?.data?.user));
			
			showMessage(res?.data?.message, true);
			setTimeout(() => {
				set({ admin: res?.data?.user, isAdmin: true });
				navigate("/");
			}, 2200);
		} catch (error) {
			showMessage(error?.response?.data?.message, false);
		} finally {
			set({ isSigningIn: false });
		}
	},
	checkAuth: async () => {
		try {
			const res = axiosConfig.post("/api/admin/is-admin");
			if (res?.data?.success) {
				set({ isAdmin: true });
			}
		} catch (error) {
			set({ isAdmin: false });
		} finally {
			set({ isChecking: false });
		}
	},
	validateEmail: async (email, showMessage, form, resContainer) => {
		try {
			set({ isValidating: true });
			const res = await axiosConfig.post("/api/admin/admin-validate-email", {
				email
			});
			if (res?.data?.success) {
				localStorage.setItem(
					"validate-email-token",
					res?.data?.token || null
				);
				form.style.display = "none";
				resContainer.style.display = "flex";
			}
		} catch (error) {
			showMessage(error?.response?.data?.message, false);
		} finally {
			set({ isValidating: false });
		}
	},
	resetPassword: async (obj, showMessage, form, resContainer, navigate) => {
		try {
			set({ isReseting: true });
			const res = await axiosConfig.put("/api/admin/admin-reset-password", obj);
			if (res?.data?.success) {
				form.style.display = "none";
				resContainer.style.display = "flex";
				localStorage.setItem("gram-bhoj", JSON.stringify(res?.data?.user));
				localStorage.removeItem("validate-email-token");
				set({ admin: res?.data?.user, isAdmin: true });
				setTimeout(() => {
					
					navigate("/");
				}, 2000);
			}
		} catch (error) {
			showMessage(error?.response?.data?.message, false);
		} finally {
			set({ isReseting: false });
		}
	},
	logoutAdmin: async () => {
		try {
			const res = await axiosConfig.post("/api/admin/admin-logout");
			if (res?.data?.success) {
				localStorage.removeItem("allbizz-admin");
				set({ admin: null });
			}
		} catch (error) {
			console.log(error);
		}
	}
}));

export default useAuth;
