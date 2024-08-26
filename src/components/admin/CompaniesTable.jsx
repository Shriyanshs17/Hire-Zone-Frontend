// import React from 'react'

import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
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
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const {companies,searchCompanyByText}=useSelector(store=>store.company);
  const[filterCompany,setFiltercompany]=useState(companies);
  const navigate=useNavigate();

  useEffect(()=>
  {
 const filteredCompany=companies.length>=0 && companies.filter((company)=>{
  if(!searchCompanyByText)
    {
     return true;
    }
    return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
  })
  setFiltercompany(filteredCompany);

  },[companies,searchCompanyByText])
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            companies?.length <=0 ? <span>You haven&apos;t registered any company yet</span>:(
              <>
              {
            filterCompany &&    filterCompany?.map((company)=>
                {
                  return (
                    <TableRow key={company}>
                    <TableCell>
                      <div className="w-12 h-12">
                        <Avatar>
                          <AvatarImage src={company?.logo} />
                        </Avatar>
                      </div>
                    </TableCell>
                    <TableCell>{company?.name}</TableCell>
                    <TableCell>{company?.createdAt?.split("T")[0]}</TableCell>
                    <TableCell className='text-right cursor-pointer'>
                        <Popover>
                            <PopoverTrigger><MoreHorizontal/></PopoverTrigger>
                            <PopoverContent className='w-32'>
                              <div onClick={()=>navigate(`/admin/companies/${company?._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                <Edit2 className='w-4'/>
                                <span>Edit</span>
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

export default CompaniesTable;
