import { create } from "zustand";
import axiosConfig from "../libs/axiosConfig";

const usePromotion = create((set, get) => ({
	promotions: [],
	loading: true,
	isDeleting: false,
	error: null,
	currentPage: 1,
	totalPages: 1,
	totalPromotions: 0,
	limit: 8,
	search: "",
	status: "",
	sortBy: "name",

	// ---- Fetch Customers ----
	getPromotion: async ({
		page = 1,
		search = "",
		status = "",
		sortBy = "newest"
	} = {}) => {
		try {
			set({ loading: true, error: null });
			const query = new URLSearchParams({
				page,
				limit: 8,
				search,
				status,
				sortBy
			});
			const { data } = await axiosConfig.get(
				`/api/admin/get-promotions?${query.toString()}`
			);
			set({
				promotions: data.promotions || [],
				totalPages: data.totalPages || 1,
				totalPromotions: data.totalPromotions || 0,
				currentPage: data.currentPage || 1,
				search,
				status,
				sortBy,
				loading: false
			});
		} catch (error) {
			set({
				error:
					error?.response?.data?.message ||
					"Failed to fetch customers",
				loading: false
			});
		}
	},
	// --- Accept Promotion --->
	acceptPromotion: async id => {
		try {
			const currentCustomers = get().promotions;
			set({
				promotions: currentCustomers.map(user =>
					user._id === id ? { ...user, is_Accept: "Accepted" } : user
				)
			});
			await axiosConfig.put(`/api/admin/accept-promotion?id=${id}`);
		} catch (error) {
			console.log("Error while accepting promotion", error.message);
		}
	},
	// ---- Delete Customer ----
	deleteCustomer: async customerId => {
		try {
			set({ isDeleting: true });
			await axiosConfig.delete(`/api/admin/delete-promotion?id=${customerId}`);

			// Safely update React state instead of directly manipulating the DOM
			const currentCustomers = get().promotions;
			const updatedCustomers = currentCustomers.filter(
				user => user._id !== customerId
			);
			const currentTotal = get().totalPromotions;

			set({
				promotions: updatedCustomers,
				totalPromotions: Math.max(0, currentTotal - 1),
				isDeleting: false
			});
		} catch (error) {
			console.log(
				"Error deleting promotion - client side, ",
				error.message
			);
			set({
				isDeleting: false
			});
		}
	}
}));

export default usePromotion;
