// import React from 'react'

import { Contact, Mail, Pen } from "lucide-react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import { useState } from "react";

import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import UpdateProfileDialog from "./UpdateProfileDialog";

// const skills = ["Html", "Css", "Javascript", "Reactjs"];
const Profile = () => {
  useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const {user}=useSelector(store=>store.auth);
    const handleClick=()=>
        {
            setOpen(true);
        }
    return (
        <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
           <AvatarImage src={user?.profile?.profilePhoto?.length?user?.profile?.profilePhoto:`data:image/jpeg;base64,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`} ></AvatarImage>
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p>
                {user?.profile?.bio}
              </p>
            </div>
          </div>
          <Button
            onClick={handleClick}
            className="text-right cursor-pointer"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>

          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className="my-5">
          <h1 className="font-medium my-3">Skills</h1>
          <div className="flex items-center gap-1">
            {user?.profile?.skills.length != 0 ? (
              user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>)
            ) : (
              <span>N/A</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {user?.profile?.resume?.length !=0 ? (
            <a
              className="text-blue-500 w-full hover:underline cursor-pointer"
              href={user?.profile?.resume}
              target="blank"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>N/A</span>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto bf-white rounded-2xl">
        <h1 className="font-bold my-5 text-lg">Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
