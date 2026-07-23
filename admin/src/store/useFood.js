import { create } from "zustand";
import axios from "../libs/axiosConfig";

const useFood = create((set, get) => ({
	foods: [],
	loading: false,
	isDeleting: false,
	error: null,
	currentPage: 1,
	totalPages: 1,
	totalFoods: 0,
	limit: 8,
	search: "",
	status: "",
	sortBy: "name",

	// ---- Fetch Customers ----
	getFoods: async ({
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
			const { data } = await axios.get(
				`/api/admin/get-foods?${query.toString()}`
			);
			set({
				foods: data.foods || [],
				totalPages: data.totalPages || 1,
				totalFoods: data.totalFoods || 0,
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
	deleteFood: async (foodId) => {
		try {
			set({ isDeleting: true });
			await axios.delete(`/api/admin/delete-foods?foodId=${foodId}`);

			// Safely update React state instead of directly manipulating the DOM
			const currentFoods = get().foods;
			const updatedFoods = currentFoods.filter(
				(food) => food._id !== foodId
			);
			const currentTotal = get().totalFoods;
			set({
				foods: updatedFoods,
				totalFoods: Math.max(0, currentTotal - 1),
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

export default useFood;
