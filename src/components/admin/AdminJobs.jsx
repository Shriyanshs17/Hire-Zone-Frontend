// import React from 'react'
import { useNavigate } from "react-router-dom"
import Navbar from "../shared/Navbar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setSearchJobByText } from "@/redux/jobSlice"
import AdminJobsTable from "./AdminJobsTable"
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs"

const AdminJobs = () => {
  useGetAllAdminJobs();
  const[input,setInput]=useState("");
    const navigate=useNavigate();
    const dispatch=useDispatch();

    useEffect(()=>
    {
      dispatch(setSearchJobByText(input));
    },[input]);
  return (
    <div>
      <Navbar/>
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between my-5'>
        <Input className='w-fit'
        onChange={(e)=>setInput(e.target.value)}
       placeholder="Filter by name,role"
       />
       <Button onClick={()=>navigate("/admin/jobs/create")}>New Jobs</Button>
        </div>
        <AdminJobsTable/>
      </div>
    </div>
  )
}

export default AdminJobs;
