import { create } from "zustand";
import axios from "axios"

const useContact = create((set,get)=>({
    // 1. DATA (state variables)
    contacts:[],
    loading:false,
    error:null,
    successMessage:null,

    // 2. ACTIONS (Functions you call from your React page)

addContact: async (contactData)=>{
    try {
        set({loading:true,error:null,successMessage:null});

        // Making post request to the backend
        const response = await axios.put("http://localhost:5000/api/admin/contact",contactData);

        // Get current list from the state
        const currentContacts = get().contacts;

// Update state ===> Adding new Contact
set({
    contacts:[response.data.contact,...currentContacts],
    loading:false,
    successMessage:"Contact info added successfully!",
});
return true
    } catch (error) {
       set({
        error:error.response?.data.data?.message || "Failed to add contact info",
        loadin:false,
       });
       return false; 
    }
}
}))

export default useContact