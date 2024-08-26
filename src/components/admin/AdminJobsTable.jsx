// import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminJobsTable= () => {
  const {allAdminJobs,searchJobByText}=useSelector(store=>store.job);
  const[filterJobs,setFilterJobs]=useState(allAdminJobs);
  const navigate=useNavigate();

  useEffect(()=>
  {
 const filteredJobs=allAdminJobs?.length>=0 && allAdminJobs.filter((job)=>{
  if(!searchJobByText)
    {
     return true;
    }
    return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase())
    || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
  })
  setFilterJobs(filteredJobs);

  },[allAdminJobs,searchJobByText])
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registered jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            allAdminJobs?.length <=0 ? <span>You haven&apos;t registered any job yet</span>:(
              <>
              {
               filterJobs && filterJobs?.map((job)=>
                {
                  return (
                    <TableRow key={job}>
                    <TableCell>{job?.company?.name}</TableCell>
                    <TableCell>{job?.title}</TableCell>
                    <TableCell>{job?.createdAt?.split("T")[0]}</TableCell>
                    <TableCell className='text-right cursor-pointer'>
                        <Popover>
                            <PopoverTrigger><MoreHorizontal/></PopoverTrigger>
                            <PopoverContent className='w-32'>
                              <div onClick={()=>navigate(`/admin/jobs/${job?._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer '>
                                <Eye className="w-4"/>
                                <span>Applicants</span>
                              </div>
                            </PopoverContent>
                        </Popover>
                    </TableCell>
                  </TableRow>
                  );
})
}
</>
            )
          }
         
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
