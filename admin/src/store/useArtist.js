import { create } from "zustand";
import axiosConfig from "../libs/axiosConfig";

const useArtist = create((set, get) => ({
	isSubmit: false,
	artists: [],
	loading: true,
	isDeleting: false,
	error: null,
	currentPage: 1,
	totalPages: 1,
	totalArtist: 0,
	limit: 8,
	search: "",
	status: "",
	sortBy: "name",
	selectedArtist: null,

	setEdit: artist => {
		set({ selectedArtist: artist });
	},
	subMitArtist: async (data, image, showMsg) => {
		try {
			set({ isSubmit: true });
			const formData = new FormData();
			formData.append("data", JSON.stringify(data));
			formData.append("image", image);
			const res = await axiosConfig.post(
				"/api/admin/add-artist",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data"
					}
				}
			);
			if (res?.data?.success) {
				showMsg(res?.data?.message, true);
			}
		} catch (error) {
			showMsg(error.message, false);
			console.log("Error while submit artist : ", error.message);
		} finally {
			set({ isSubmit: false });
		}
	},
	editArtist: async (data, image, showMsg) => {
		try {
			set({ isSubmit: true });
			const formData = new FormData();
			formData.append("data", JSON.stringify(data));
			if(data.isNewImage) {
			formData.append("image", image);
			}
			
			const res = await axiosConfig.put(
				"/api/admin/edit-artist?id="+get().selectedArtist?._id,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data"
					}
				}
			);
			if (res?.data?.success) {
				showMsg(res?.data?.message, true);
			}
		} catch (error) {
			showMsg(error.message, false);
			console.log("Error while edit artist : ", error.message);
		} finally {
			set({ isSubmit: false });
		}
	},
	// ---- Fetch Customers ----
	getArtist: async ({
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
				`/api/admin/get-artist?${query.toString()}`
			);
			set({
				artists: data.artists || [],
				totalPages: data.totalPages || 1,
				totalArtist: data.totalArtist || 0,
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
	deleteArtist: async customerId => {
		try {
			set({ isDeleting: true });
			await axiosConfig.delete(`/api/admin/delete-artist?id=${customerId}`);

			// Safely update React state instead of directly manipulating the DOM
			const currentCustomers = get().artists;
			const updatedCustomers = currentCustomers.filter(
				user => user._id !== customerId
			);
			const currentTotal = get().totalArtist;

			set({
				artists: updatedCustomers,
				totalArtist: Math.max(0, currentTotal - 1),
				isDeleting: false
			});
		} catch (error) {
			console.log("Error deleting artist - client side, ", error.message);
			set({
				isDeleting: false
			});
		}
	}
}));

export default useArtist;
