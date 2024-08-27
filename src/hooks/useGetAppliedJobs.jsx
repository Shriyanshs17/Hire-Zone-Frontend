import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_ENDPOINT } from "@/utils/constant";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const useGetAppliedJobs=()=>{
    const token = window.localStorage.getItem("token");
    const dispatch=useDispatch();
    
    useEffect(()=>
    {
        const fetchAppliedJobs=async()=>
        {
        try {
            const res=await axios.get(`${APPLICATION_API_ENDPOINT}/get`,{
                headers:
                {
                  Authorization:token
                },withCredentials:true});
            if(res.data.success)
            {
                // console.log(res.data);
                dispatch(setAllAppliedJobs(res.data.application));
            }
        } catch (error) {
            console.log(error);
        }
    }
    fetchAppliedJobs();
    },[])
};

export default useGetAppliedJobs;
