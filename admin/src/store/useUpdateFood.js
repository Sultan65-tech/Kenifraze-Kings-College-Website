import { create } from "zustand";
import axios from "../libs/axiosConfig";

const useUpdateFood = create((set, get) => ({
	images: [], // Array of Base64 strings (Max 6)
	formData: {
		content: ""
	},
	isSubmitting: false,
	error: null,
	success: false,

	// Update individual form text fields
	setFormField: (field, value) =>
		set(state => ({
			formData: { ...state.formData, [field]: value }
		})),
	// Append new base64 images up to the limit of 6
	addImages: (newBase64Strings, showMsg) => {
		const currentImages = get().images;
		if (currentImages.length >= 6) {
			showMsg("You can only upload a maximum of 6 images.", false);
			return;
		}
		const allowedSlots = 6 - currentImages.length;
		const incoming = newBase64Strings.slice(0, allowedSlots);
		set({ images: [...currentImages, ...incoming] });
		if (newBase64Strings.length > allowedSlots) {
			showMsg(
				"Some images were omitted. Maximum limit is 6 images.",
				false
			);
		}
	},

	// Remove a specific image by its index position
	removeImage: indexToRemove =>
		set(state => ({
			images: state.images.filter((_, index) => index !== indexToRemove)
		})),

	// Reset form data completely
	resetForm: () =>
		set({
			images: [],
			formData: {
				content: ""
			},
			error: null,
			success: false
		}),
	// Submit final payload to your API server
	submitFoodItem: async (e, showMsg) => {
		if (e) e.preventDefault();
		const { formData } = get();
		if (!formData?.content || formData.content === "") {
			showMsg(`privacy policy content is required!`, false);
			return;
		}
		set({ isSubmitting: true });
		try {
			const res = await axios.put("/api/edit-privacy", formData);
			if (!res?.data.success) {
				showMsg(res?.data?.message, false);
				return;
			}
			set({ success: true });
			get().resetForm();
			showMsg("privacy policy updated successfully!", true);
		} catch (err) {
			set({ error: err.message });
			showMsg(`Submission Error: ${err.message}`, false);
		} finally {
			set({ isSubmitting: false });
		}
	}
}));

export default useUpdateFood;
