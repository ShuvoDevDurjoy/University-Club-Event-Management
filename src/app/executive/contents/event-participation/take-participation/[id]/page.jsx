"use client";

import Header from "../../../../../executive/elements/Header";
import axiosClient from "../../../../../../lib/axiosClient";
import { notify } from "../../../../../../lib/toastify";
import Image from "next/image";
import { use, useEffect, useState } from "react";

const page = ({ params }) => {
  const { id } = use(params);

  const [members, setMembers] = useState([]);

  const fetchMember = async () => {
    try {
      console.log("id is : ", id);
      const response = await axiosClient.get(`executive/ep/participation`, {
        params: {
          event_id: id,
        },
      });
      if (response.data.success) {
        setMembers(response.data.members);
      }
    } catch (e) {
      notify.error("Something Went Wrong");
      console.log(e);
    }
  };

  const submissionHandler = async()=>{
    try{
      console.log("posting members: ",members);
      const response = await axiosClient.post('executive/ep/participation', {members});
      if(response.data.success){
        notify.success("Updated Participation Successfull");
        fetchMember();
      }
      else{
        notify.error("Something Went Wrong! Submit Again!")
        console.log(response.data)
      }
    }catch(e){
      console.log(e.response)
      notify.error("Something Went Wrong! Submit Again!")
    }
  }

  const update = (index) => {
    const updatedMembers = [...members]; // clone the array
    updatedMembers[index] = {
      ...updatedMembers[index], // clone the object
      participated: !updatedMembers[index].participated, // toggle participated
    };
    setMembers(updatedMembers);
  };

  useEffect(() => {
    fetchMember();
  }, []);

  return (
    <div className="h-full text-white">
      <Header content={"Post New Event"} />
      <div className="h-content-full mt-2 rounded-[5px] bg-white/10 pt-2 overflow-y-scroll scroll-py-2 no-scrollbar">
        <div className="p-2 flex flex-col gap-3">
          {members.map((member, index) => {
            return (
              <div
                key={index}
                className="flex gap-5 justify-between bg-white/10 p-3 border-[1px] border-white/10 hover:border-white/50 rounded-[5px]"
              >
                <div>
                  <p className="flex gap-5 justify-between">
                    <span className="text-xl">Name: </span>
                    <span className="text-xl">{member.student_name}</span>
                  </p>
                  <p className="flex gap-5 justify-between">
                    <span className="text-xl">Student ID: </span>
                    <span className="text-xl">{member.student_id}</span>
                  </p>
                  <p className="flex gap-5 justify-between">
                    <span className="text-xl">Membership ID: </span>
                    <span className="text-xl">{member.membership_id}</span>
                  </p>
                </div>
                <div className="relative flex items-center p-5">
                  <Image
                    width="40"
                    height="40"
                    className={`p-[5px] rounded-full cursor-pointer ${
                      member.participated ? "bg-green-500" : "bg-white/20"
                    }`}
                    onClick={() => {
                      update(index);
                    }}
                    src="/icons/check_icon.svg"
                    alt={`check_icon_${index}`}
                  />
                </div>
              </div>
            );
          })}
          <div onClick={submissionHandler} className="px-10 py-3 my-5 bg-green-500 inline-block mx-auto text-xl rounded-[10px] cursor-pointer">Update Participation</div>
        </div>
      </div>
    </div>
  );
};

export default page;
