import { create } from "zustand";
import axiosConfig from "../libs/axiosConfig";

const useContact = create((set, get) => ({
	contact: null,
	about: null,
	terms: null,
	privacy: null,
	heroImages: null,
	isSubmit: false,
	isFetching: false,

	submitLogo: async (file, showMsg) => {
		try {
			set({ isSubmit: true });
			const formData = new FormData();
			formData.append("logo", file);
			const res = await axiosConfig.put(
				"/api/admin/settings/update-logo",
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
		} finally {
			set({ isSubmit: false });
		}
	},
	submitHero: async (data, showMsg) => {
		try {
			set({ isSubmit: true });
			const res = await axiosConfig.put(
				"/api/admin/settings/update-hero-setting",
				data,
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
			console.log("Error while submit hero section", error.message);
			showMsg(error.message, false);
		} finally {
			set({ isSubmit: false });
		}
	},
	submitPrivacy: async (data, showMsg) => {
		try {
			set({ isSubmit: true });
			const res = await axiosConfig.put(
				"/api/admin/settings/update-privacy-setting",
				data
			);
			if (res?.data?.success) {
				showMsg(res?.data?.message, true);
			}
		} catch (error) {
			console.log("Error while submit privacy", error.message);
			showMsg(error.message, false);
		} finally {
			set({ isSubmit: false });
		}
	},
	submitTerm: async (data, showMsg) => {
		try {
			set({ isSubmit: true });
			const res = await axiosConfig.put(
				"/api/admin/settings/update-terms-setting",
				data
			);
			if (res?.data?.success) {
				showMsg(res?.data?.message, true);
			}
		} catch (error) {
			console.log("Error while submit terms", error.message);
			showMsg(error.message, false);
		} finally {
			set({ isSubmit: false });
		}
	},
	submitAbout: async (data, showMsg) => {
		try {
			set({ isSubmit: true });
			const res = await axiosConfig.put(
				"/api/admin/settings/update-about-setting",
				data
			);
			if (res?.data?.success) {
				showMsg(res?.data?.message, true);
			}
		} catch (error) {
			console.log("Error while submit about", error.message);
			showMsg(error.message, false);
		} finally {
			set({ isSubmit: false });
		}
	},
	submitContact: async (data, showMsg) => {
		try {
			set({ isSubmit: true });
			const res = await axiosConfig.put(
				"/api/admin/settings/update-contact-setting",
				data
			);
			if (res?.data?.success) {
				showMsg(res?.data?.message, true);
			}
		} catch (error) {
			console.log("Error while submit contact", error.message);
			showMsg(error.message, false);
		} finally {
			set({ isSubmit: false });
		}
	},
	fetchContact: async () => {
		try {
			set({ isFetching: true });
			const res = await axiosConfig.get(
				"/api/admin/settings/get-site-contact"
			);
			if (res?.data?.success) {
				set({ contact: res?.data?.contact });
			}
		} catch (error) {
			console.log("Error while fetching contact", error.message);
		} finally {
			set({ isFetching: false });
		}
	},
	fetchAbout: async () => {
		try {
			set({ isFetching: true });
			const res = await axiosConfig.get(
				"/api/admin/settings/get-site-about"
			);
			if (res?.data?.success) {
				set({ about: res?.data?.about });
			}
		} catch (error) {
			console.log("Error while fetching about", error.message);
		} finally {
			set({ isFetching: false });
		}
	},
	fetchTerms: async () => {
		try {
			set({ isFetching: true });
			const res = await axiosConfig.get(
				"/api/admin/settings/get-site-terms"
			);
			if (res?.data?.success) {
				set({ terms: res?.data?.terms });
			}
		} catch (error) {
			console.log("Error while fetching terms", error.message);
		} finally {
			set({ isFetching: false });
		}
	},
	fetchPrivacy: async () => {
		try {
			set({ isFetching: true });
			const res = await axiosConfig.get(
				"/api/admin/settings/get-site-privacy"
			);
			if (res?.data?.success) {
				set({ privacy: res?.data?.privacy });
			}
		} catch (error) {
			console.log("Error while fetching privacy", error.message);
		} finally {
			set({ isFetching: false });
		}
	},
	fetchHero: async () => {
		try {
			set({ isFetching: true });
			const res = await axiosConfig.get(
				"/api/admin/settings/get-site-hero"
			);
			if (res?.data?.success) {
				set({ heroImages: res?.data?.hero });
			}
		} catch (error) {
			console.log("Error while fetching hero section", error.message);
		} finally {
			set({ isFetching: false });
		}
	}
}));

export default useContact;
