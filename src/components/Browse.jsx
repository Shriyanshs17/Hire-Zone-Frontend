// import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import Job from "./Job";
import Navbar from "./shared/Navbar"
import { setSearchedQuery } from "@/redux/jobSlice";
import { useEffect } from "react";
import useGetallJobs from "@/hooks/useGetAllJobs";
import { motion } from "framer-motion";

// const randomJobs=[1,2,3,2,4,5,6,6];

const Browse = () => {
  useGetallJobs();
  const dispatch=useDispatch();
  const {allJobs}=useSelector(store=>store.job); //using searched query to filter only searched jobs
  useEffect(()=>{
    return ()=>{
      dispatch(setSearchedQuery(""));
    }
  })
  return (
    <div>
      <Navbar/>
      <div className="max-w-7xl mx-auto my-10">
        <h1 className='font-bold text-xl my-10'>Search Results ({allJobs.length})</h1>
        <div className='grid grid-cols-3 gap-4'>
            { 
                allJobs.map((job)=>
                {
                    return (
                      <motion.div initial={{opacity:0,x:100}}
                 animate={{opacity:1,x:0}}
                 exit={{opacity:0,x:-100}}
                 transition={{duration:0.3}}
                 key={job._id}>
                  
                    < Job job={job}/ >
                 </motion.div>
                    )
                   
                })
            }
        </div>
      </div>
    </div>
  )
}

export default Browse
