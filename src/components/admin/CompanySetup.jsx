// import React from 'react'

import { ArrowLeft, Loader2 } from "lucide-react"
import Navbar from "../shared/Navbar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useEffect, useState } from "react"
import axios from "axios"
import { COMPANY_API_ENDPOINT } from "@/utils/constant"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import { useDispatch, useSelector } from "react-redux"
import { setLoading } from "@/redux/authSlice"
import useGetCompanyById from "@/hooks/useGetCompanyById"

const CompanySetup = () => {
 const token=window.localStorage.getItem("token");
  const params=useParams();
  useGetCompanyById(params.id);
  const[input,setInput]=useState(
    {
       name:"",
       description:"",
       website:"",
       location:"",
       file:null
    }
  );
  const {singleCompany}=useSelector(store=>store.company);
  const dispatch=useDispatch();
const navigate=useNavigate();
const {loading}=useSelector(store=>store.auth);

  const changeEventHandler=(e)=>
  {
    setInput({...input,[e.target.name]:e.target.value});
  }

  const changeFileHandler=(e)=>
  {
    const file=e.target.files?.[0];
    setInput({...input,file});
  }
const submitHandler =async(e)=>
{
  dispatch(setLoading(true));
  e.preventDefault();
  const formData=new FormData();
  formData.append("name",input.name);
  formData.append("description",input.description);
  formData.append("website",input.website);
  if(input.file)
  {
    formData.append("file",input.file);
  }
  try {
    const res=await axios.put(`${COMPANY_API_ENDPOINT}/update/${params.id}`,formData,{
      headers:{
        'content-Type':'multipart/form-data',
        Authorization:token
      },
      withCredentials:true
    });
    if(res.data.success)
    {
      toast.success(res.data.message);
      navigate("/admin/companies")
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
  finally{
    dispatch(setLoading(false));
  }
}

useEffect(()=>
{
  setInput({
    name:singleCompany.name || "",
    description:singleCompany.description || "",
    website:singleCompany.website || "",
    location:singleCompany.location || "",
    file:singleCompany.logo || ""
  })
},[singleCompany])
console.log(singleCompany);
  return (
    <div>
      <Navbar/>
      <div className='max-w-xl mx-auto my-10'>
       <form onSubmit={submitHandler}>
        <div className="flex items-center gap-5 p-8">
        <Button onClick={()=>navigate("/admin/companies")}variant='outline' className='flex items-center gap-2 text-gray-500 font-semibold'>
          <ArrowLeft/>
          <span>Back</span>
        </Button>
        <h1 className='font-bold text-xl'>Company Setup</h1>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div >
        <Label>Company Name</Label>
        <Input
        type='text'
        name='name'
        onChange={changeEventHandler}
        value={input.name}
        />
        </div>
        <div >
        <Label>Description</Label>
        <Input
        type='text'
        name='description'
        onChange={changeEventHandler}
        value={input.description}
        />
        </div>
          <div >
        <Label>Website</Label>
        <Input
        type='text'
        name='website'
        onChange={changeEventHandler}
        value={input.website}
        />
        </div>
        <div >
        <Label>Location</Label>
        <Input
        type='text'
        name='location'
        onChange={changeEventHandler}
        value={input.location}
        />
        </div>
          <div >
        <Label>Logo</Label>
        <Input
        type='file'
        accept='image/*'
        onChange={changeFileHandler}
        />
        </div>
        </div>
       {
         loading?<Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait</Button>: <Button type="submit" className="w-full my-4">Update</Button>
       }
       </form>
      </div>
    </div>
  )
}

export default CompanySetup
