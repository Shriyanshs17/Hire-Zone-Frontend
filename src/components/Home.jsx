// import React from 'react'
import CategoryCarousel from './CategoryCarousel'
import Footer from './shared/Footer'
import HeroSection from './HeroSection'
import LatestJobs from './LatestJobs'
import Navbar from './shared/Navbar'
import useGetAllJobs from "../hooks/useGetAllJobs"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Home = () => {
  const {user}=useSelector(store=>store.auth);
  const navigate=useNavigate();
    useEffect(()=>{
      if(user?.role==='recruiter')
        {
          navigate("/admin/companies");
        }

      },[]);
      
      if (user?.role !== 'recruiter' && user) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useGetAllJobs();
      }
      // useGetAllJobs();

  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <CategoryCarousel/>
      <LatestJobs/>
      <Footer/>
    </div>
  )
}

export default Home
