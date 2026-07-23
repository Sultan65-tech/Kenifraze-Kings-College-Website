import { create } from "zustand";
import axiosConfig from "../libs/axiosConfig";

const useCustomer = create((set, get) => ({
	customers: [],
	loading: true,
	isDeleting: false,
	error: null,
	currentPage: 1,
	totalPages: 1,
	totalCustomers: 0,
	limit: 8,
	search: "",
	status: "",
	sortBy: "name",
	
	// ---- Fetch Customers ----
	getCustomers: async ({
		page = 1,
		search = "",
		status = "",
		sortBy = "name"
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
				`/api/admin/get-customers?${query.toString()}`
			);
			set({
				customers: data.customers || [],
				totalPages: data.totalPages || 1,
				totalCustomers: data.totalCustomers || 0,
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

	// ---- Delete Customer ----
	deleteCustomer: async (customerId) => {
		try {
			set({ isDeleting: true });
			await axiosConfig.delete(
				`/api/admin/delete-customers?customerId=${customerId}`
			);
			
			// Safely update React state instead of directly manipulating the DOM
			const currentCustomers = get().customers;
			const updatedCustomers = currentCustomers.filter(user => user._id !== customerId);
			const currentTotal = get().totalCustomers;

			set({ 
				customers: updatedCustomers,
				totalCustomers: Math.max(0, currentTotal - 1),
				isDeleting: false 
			});
		} catch (error) {
			console.log(
				"Error deleting customer - client side, ",
				error.message
			);
			set({
				isDeleting: false
			});
		}
	}
}));

export default useCustomer;