import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useAcademics = ()=>{
    return useQuery({
        queryKey:["academics"],
        queryFn:async ()=>{
            const  {data} = await axios.get("http://localhost:5000/api/admin/academics")
            return data || [];
        }
    })
}