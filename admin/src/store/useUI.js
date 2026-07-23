import { create } from "zustand";

const useUI = create((set, get) => ({
	isMenu : false,
	setMenu : ()=>{
	    set({isMenu: !get().isMenu})
	}
}))

export default useUI