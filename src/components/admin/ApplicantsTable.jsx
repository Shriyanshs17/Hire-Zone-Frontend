import { MoreHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";

const shortListingStatus=['Accepted','Rejected'];

const ApplicantsTable = () => {
  const token = window.localStorage.getItem("token");
  const {applicants}=useSelector(store=>store.application);

  const statusHandler=async (status,id)=>
  {
    try {
      const res=await axios.post(`${APPLICATION_API_ENDPOINT}/status/${id}/update`,{status},
        {
          headers:
          {
            Authorization:token
          },withCredentials:true});
      if(res.data.success)
      {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied users</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Full name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Resume</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className='text-right'>Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
          {
            applicants && applicants?.applications?.map((item)=>
            {
              return ( 
              <TableRow key={item._id}>
                <TableCell>{item?.applicant?.fullname || `N/A`}</TableCell>
                <TableCell>{item?.applicant?.email || `N/A`}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber || `N/A`}</TableCell>
                <TableCell>
                  {
                    item?.applicant?.profile?.resume ?<a  className="text-blue-600 cursor-pointer" href={item?.applicant?.profile?.resume} target='_blank'>
                    {item?.applicant?.profile?.resumeOriginalName}</a>:<span>N/A</span>
                  }  
                    </TableCell>
                <TableCell>{item?.applicant?.createdAt.split("T")[0] || 'N/A'}</TableCell>
                <TableCell>{item?.status || 'N/A'}</TableCell>
                
                <TableCell className='text-right cursor-pointer'>
                    <Popover>
                        <PopoverTrigger><MoreHorizontal/></PopoverTrigger>
                        <PopoverContent className="w-32">
                        {
                        shortListingStatus.map((status,index)=>
                        {
                            return (
                                <div onClick={()=>statusHandler(status,item?._id)}className='flex w-fit items-center my-2 cursor-pointer'key={index}>
                                  <span>{status}</span>
                                </div>
                            )
                        })
                    }
                        </PopoverContent>
                    </Popover>
                </TableCell>
            </TableRow>)
            })
          }
           
        </TableBody>
      </Table>
    </div>
  )
}

export default ApplicantsTable
