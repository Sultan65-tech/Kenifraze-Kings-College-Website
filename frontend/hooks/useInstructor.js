import { useQuery } from "@tanstack/react-query";
import axios from "axios"


export const useInstructor = ()=>{
    return useQuery({
        queryKey:["instructors"],
        queryFn:async()=>{
            const {data} = await axios.get("http://localhost:5000/api/admin/instructors")
            return data || [];
        }
    })
}
