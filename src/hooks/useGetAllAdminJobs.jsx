import { setAllAdminJobs } from '@/redux/jobSlice';
import { JOB_API_ENDPOINT } from '@/utils/constant';
import axios from 'axios';
import  { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useGetAllAdminJobs = () => {
  const token = window.localStorage.getItem("token");
    const dispatch=useDispatch();
    useEffect(()=>{
      const fetchAllAdminJobs=async ()=>
        {
          try {
            const res=await axios.get(`${JOB_API_ENDPOINT}/getadminjobs`,{
              headers:
              {
                Authorization:token
              },withCredentials:true});
            if(res.data.success)
            {
                dispatch(setAllAdminJobs(res.data.jobs));
            }
        } catch (error) {
            console.log(error);
        }
      }
      fetchAllAdminJobs();
    },[]);
 
}

export default useGetAllAdminJobs;
