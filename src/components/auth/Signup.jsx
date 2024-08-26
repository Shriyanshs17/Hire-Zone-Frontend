import  { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { setLoading } from "@/redux/authSlice";

const Signup = () => {
  const [input,setInput]=useState({
    fullname:"",
    email:"",
    phoneNumber:"",
    password:"",
    role:"",
    file:""
  });
  const {user}=useSelector(store=>store.auth)
 const navigate=useNavigate();
 const {loading} =useSelector(store=>store.auth);
 const dispatch=useDispatch();
  const changeEventHandler=(event)=>
  {
    // const[name,value]=event.target;
    setInput({...input,[event.target.name]:event.target.value});
  }

  const changeFileHandler=(e)=>
  {
    setInput({...input,file:e.target.files?.[0]});
  }
  const handleSubmit=async(e)=>
  {
    e.preventDefault();
    const formData=new FormData();
    formData.append("fullname",input.fullname);
    formData.append("email",input.email);
    formData.append("phoneNumber",input.phoneNumber);
    formData.append("password",input.password);
    formData.append("role",input.role);
    if(input.file)
    {
      formData.append("file",input.file);
    }

     try {
      dispatch(setLoading(true));
       const res=await axios.post(`${USER_API_ENDPOINT}/register`,formData, {
        headers:{
          "Content-Type":"multipart/form-data"
        },
        withCredentials:true
      } );
      if (res && res.data && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error("Unexpected response format");
      }
     } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
     }
     finally{
      dispatch(setLoading(false));
     }
  }

  useEffect(()=>
    {
      if(user)
      {
        navigate("/");
      }
    })
    
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="w-1/2 border border-gray-200 rounder-md p-4 my-18"
        >
          <h1 className="font-bold text-xl mv-5">Sign Up</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input type="text" 
             name="fullname"
             value={input.fullname}
             onChange={changeEventHandler}
            placeholder="Shriyansh Singh Distwar" />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input type="text" 
            value={input.email}
            name="email"
            onChange={changeEventHandler}
            placeholder="shriyanshsinghdistwar@gmail.com" />
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input type="text"
            name="phoneNumber"
            value={input.phoneNumber}
            onChange={changeEventHandler}
             placeholder="6386019899" />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
             placeholder="********" />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-cnter gap-4 my-5">
              <div className="flex items-center space-x-2">
               <Input
               type="radio"
               name="role"
               value="student"
               checked={input.role==="student"}
               onChange={changeEventHandler}
               className="cursor-pointer"
               />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
              <Input
               type="radio"
               name="role"
               value="recruiter"
               checked={input.role==="recruiter"}
               onChange={changeEventHandler}
               className="cursor-pointer"
               />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            
            <div className='flex items-center gap-2'>
                 <Label>Profile</Label>
                 <Input
                 accept="image/*"
                 type="file"
                 onChange={changeFileHandler}
                 className="cursor-pointer"
                 />
            </div>
          </div>
          {
 loading?<Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait</Button>: <Button type="submit" className="w-full my-4">Signup</Button>
           }
          <span className='text-sm'>Already have an account? <Link to="/login" className="text-blue-600">Login</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
