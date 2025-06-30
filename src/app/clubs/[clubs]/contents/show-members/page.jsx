"use client";
import React, { useContext, useEffect, useState } from "react";
import Header from "../../elements/Header";
import { context } from "../../ClubContext";
import axiosClientMember from "../../../../../lib/axiosClientMember";

const page = () => {
  const { club_name } = useContext(context);

  const [executives, setExecutives] = useState([]);
  const [members, setMembers] = useState([]);

  const fetchMembers = async () => {
    try {
      const response = await axiosClientMember.get(
        `/clubs/${club_name}/members`
      );
      if (response.data.success) {
        setExecutives(response.data.executives);
        setMembers(response.data.members);
      }
    } catch (e) {
      console.log("Something went wrong in the fetching members");
      console.log(e);
    }
  };

  useEffect(() => {
    if (!club_name) return;
    fetchMembers();
  }, [club_name]);

  return (
    <div className="h-full text-white">
      <Header content={"View Event Participations"} />
      <div className="h-content-full mt-2 rounded-[5px] bg-white/10 pt-2 overflow-y-scroll scroll-py-2 no-scrollbar">
        <div className="p-2 flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <div>
              <h2 className="bg-white/10 rounded-[5px] text-center text-2xl px-5 py-3">Executives</h2>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {executives.map((member, index) => {
                return (
                  <div key={index} className="text-xl bg-white/20 rounded-[5px] p-3">
                    <p className="text-center text-2xl text-yellow-300">{member.role_name}</p>
                    <p>Name: {member.name}</p>
                    <p>Email: {member.email}</p>
                    <p>Student ID: {member.student_id}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <h2 className="bg-white/10 rounded-[5px] text-center text-2xl px-5 py-3">Members</h2>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {members.map((member, index) => {
                return (
                  <div key={index} className="text-xl bg-white/20 rounded-[5px] p-3">
                    <p>Name: {member.name}</p>
                    <p>Email: {member.email}</p>
                    <p>Student ID: {member.student_id}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
