// import React from 'react'

import {  useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import { setSearchedQuery } from "@/redux/jobSlice"
import { useDispatch } from "react-redux"

const category=[
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]

const CategoryCarousel = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const searchJobHandler=(cat)=>
    {
      dispatch(setSearchedQuery(cat))
      navigate("/browse");
    }
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
       <CarouselContent>
        {
            category.map((cat,)=>
            (
                <CarouselItem key={cat} className='md:basis-1/2 lg:basis-1/3 '>
                    <div className="flex items-center justify-center">
                 <Button onClick={()=>searchJobHandler(cat)}className="rounded-full ">{cat}</Button>
                    </div>
                </CarouselItem>
            ))
        }
       
       </CarouselContent>
       <CarouselPrevious/>
       <CarouselNext/>
      </Carousel>
    </div>
  )
}

export default CategoryCarousel
