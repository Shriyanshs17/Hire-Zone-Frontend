import { APPLICATION_API_ENDPOINT } from "@/utils/constant";
import Navbar from "../shared/Navbar"
import ApplicantsTable from "./ApplicantsTable"
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";
import { useEffect } from "react";


const Applicants = () => {
    const params=useParams();
    const dispatch=useDispatch();
    const {applicants}=useSelector(store=>store.application);
    
    useEffect(()=>
    {
       const fetchAllAppplicants=async ()=>
       {
        // console.log("i am before try");
        try {
            const res=await axios.get(`${APPLICATION_API_ENDPOINT}/${params.id}/applicants`,{withCredentials:true});
            // console.log(res.data);
               dispatch(setAllApplicants(res.data.job));
        } catch (error) {
            console.log(error);
        }
        // console.log("i am after try");
        
       }
       fetchAllAppplicants();
    },[]);

    // console.log(applicants);
  return (
    <div>
     <Navbar/>
     <div className='max-w-7xl mx-auto'>
       <h1 className='font-bold text-xl my-5'>Applicants {applicants?.applications?.length}</h1>
        <ApplicantsTable/>
     </div>
    </div>
  )
}

export default Applicants
