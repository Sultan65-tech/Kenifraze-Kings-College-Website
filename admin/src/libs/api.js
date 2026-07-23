
const api =
	import.meta.env.VITE_NODE_ENV === "development"
		? import.meta.env.VITE_DEVELOPMENT
		: import.meta.env.VITE_PRODUCTION;
		
		export default api