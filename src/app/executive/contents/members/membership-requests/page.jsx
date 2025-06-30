'use client'

import Header from "../../../elements/Header";
import axiosClient from "../../../../../lib/axiosClient";
import { notify } from "../../../../../lib/toastify";
import { useEffect, useState } from "react";

const page = () => {

    const [membershipRequests, setMembershipRequests] = useState([]);

    const fetchMemberships = async()=>{
        try{
            const membership_requests = await axiosClient.get("executive/mr/memberships");
            if(membership_requests.data.success){
                setMembershipRequests(membership_requests.data.membership_requests);
                console.log(membership_requests.data.membership_requests);
            }
            else{
                notify.error("Something Went Wrong");
            }
        }catch(e){
            notify.error("Something Went Wrong");
            console.log(e);
        }
    }

    const onClickHandler = async(id, password)=>{
        try{
            const response = await axiosClient.patch(`executive/mr/memberships/${id}`, {student_id: id, password: password});
            if(response.data.success){
                notify.success("update Successfull");
                console.log(response.data);
                fetchMemberships();
            }
        }catch(e){
            notify.error("Something Went Wrong");
            console.log(e);
        }
    }

    useEffect(()=>{
        fetchMemberships();
    },[]);

  return (
    <div className="h-full text-white">
      <Header content={"View Club Members"} />
      <div className="h-content-full mt-2 rounded-[5px] bg-white/10 pt-2 overflow-y-scroll scroll-py-2 no-scrollbar">
        <div className="p-2">
            {
                membershipRequests.map((request,index)=>{
                    return (
                        <div className="flex gap-10 justify-between" key={index}>
                            <div>
                                <p className="flex gap-5 justify-between"><span className="text-xl">Student Name:</span><span className="text-xl text-yellow-200">{request.student_name}</span></p>
                                <p className="flex gap-5 justify-between"><span className="text-xl">Student Email:</span><span className="text-xl text-yellow-200">{request.student_email}</span></p>
                                <p className="flex gap-5 justify-between"><span className="text-xl">Student Id:</span><span className="text-xl text-yellow-200">{request.student_id}</span></p>
                            </div>
                            <div className="flex items-center px-3">
                                <p onClick={()=>{onClickHandler(request.student_id, request.password)}} className="cursor-pointer px-5 py-2 bg-green-500 text-xl">Approve</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
      </div>
    </div>
  );
};

export default page;
