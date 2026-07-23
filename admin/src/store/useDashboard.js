import { create } from "zustand";
import axiosConfig from "../libs/axiosConfig";

const useDashboard = create((set, get) => ({
	isLoading: true,
	DIRECT_CONSULTATION: 0,
	FEATURE_PLAN: 0,
	PROMOTION_ON_SITE: 0,
	campaign: null,
	stats: [
		{
			title: "Today's Orders",
			icon: "📦",
			value: "268",
			subtitle: "↑ 24% • vs yesterday",
			color: "#22c55e"
		},
		{
			title: "Revenue",
			icon: "৳",
			value: "2,14,850",
			subtitle: "↑ 18% • vs yesterday",
			color: "#22c55e"
		},
		{
			title: "Active Deliveries",
			icon: "🚀",
			value: "94",
			subtitle: "12 delayed",
			color: "#eab308"
		},
		{
			title: "Happy Customers",
			icon: "❤️",
			value: "1.8k",
			subtitle: "+87 today",
			color: "#22c55e"
		}
	],

	getDashboard: async () => {
		try {
			set({ isLoading: true });
			const res = await axiosConfig.get("/api/admin/dashboard");
			set({ stats: res?.data?.info,
			DIRECT_CONSULTATION :res?.data?.DIRECT_CONSULTATION ,
			FEATURE_PLAN : res?.data?.FEATURE_PLAN,
			PROMOTION_ON_SITE : res?.data?.PROMOTION_ON_SITE,
			campaign : res?.data?.campaign
			    
			});
		} catch (error) {
			console.log(error.message);
		} finally {
			set({ isLoading: false });
		}
	}
}));

export default useDashboard;
