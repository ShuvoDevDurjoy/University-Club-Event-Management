'use client'
import React, { useContext, useEffect, useState } from "react";
import Header from "../../elements/Header";
import axiosClientMember from "../../../../../lib/axiosClientMember";
import { context } from "../../ClubContext";

const page = () => {

    const {club_name} = useContext(context);
    const [participations, setParticipations] = useState([]);

    const getParticipations = async()=>{
        try{
            const response = await axiosClientMember.get(`/clubs/${club_name}/participations`);

            if(response.data.success){
                setParticipations(response.data.participations);
            }
        }catch(e){
            console.log("Something went wrong in participation page");
            console.log(e);
        }
    }
    useEffect(()=>{
        if(! club_name){
            return ;
        }
        getParticipations();
    },[club_name])
  return (
    <div className="h-full text-white">
      <Header content={"View Event Participations"} />
      <div className="h-content-full mt-2 rounded-[5px] bg-white/10 pt-2 overflow-y-scroll scroll-py-2 no-scrollbar">
        <div className="p-2">
            {
                participations.map((participation,index)=>{
                    return (
                        <div key={index} className="flex items-center gap-10 justify-between bg-white/20 p-2 rounded-[5px] border-[2px] border-white">
                            <div className="text-xl">
                                <p>Event Name: {participation.name}</p>
                                <p>Event Start: {new Date(participation.start).toLocaleString()}</p>
                                <p>Event Name: {new Date(participation.end).toLocaleString()}</p>
                            </div>
                            <div>
                                <p className={`${participation.participated?"bg-green-500":"bg-red-500"} px-5 py-3 rounded-[5px] border-white border-[2px] text-xl text-center`}>{participation.participated?"Participated":"Not Participated"}</p>
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
