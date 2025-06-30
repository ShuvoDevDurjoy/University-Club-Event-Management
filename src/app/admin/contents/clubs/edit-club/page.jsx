"use client";
import Header from "../../../../../app/executive/elements/Header";
import axiosClient from "../../../../../lib/axiosClient";
import { notify } from "../../../../../lib/toastify";
import Link from "next/link";
import { useEffect, useState } from "react";

const page = () => {
  const [clubs, setClubs] = useState([]);

  const fetchClubs = async () => {
    try {
      const clubs = await axiosClient.get("admin/clubs",{changeStatus: true});
      if (clubs.data.success) {
        setClubs(clubs.data.clubs);
      }
    } catch (e) {
      notify.error("some");
      console.log(e);
    }
  };

  const handleStatus = async (club_id, name, status) => {
    try {
      const response = window.confirm(
        `Do you want to take this action?\n\n This will ${
          status==="active" ? "Inactive" : "Active"
        } ${name}`
      );
      if (response) {
        const statusResult = await axiosClient.patch(`admin/clubs/${club_id}`,{changeStatus: true});
        if (statusResult.data.success) {
          notify.success(statusResult.data.message || "Successfull");
          console.log(statusResult.data.club)
          fetchClubs();
        }
        else
          notify.error("Something Went Wrong");
      }
    } catch (e) {
      notify.error("Something Went Wrong");
      console.log(e);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  return (
    <div className="h-full text-white">
      <Header content={"Add New Club"} />
      <div className="h-content-full mt-2 rounded-[5px] bg-white/10 pt-2 overflow-y-scroll scroll-py-2 no-scrollbar">
        <div className="p-2 flex flex-col gap-5">
          {clubs.map((club, index) => {
            return (
              <div
                key={index}
                className="flex flex-col gap-3 bg-white/5 p-3 border-white/20 border-[1px] rounded-[5px]"
              >
                <h1 className="p-5 bg-white/10 text-2xl text-center rounded-[5px]">
                  {club.club_name}
                </h1>
                <div className="flex gap-3 justify-between">
                  <div className="flex-1 p-5 bg-white/10 rounded-[5px] text-xl">
                    {club.club_description.split("\n").map((line, index) => (
                      <p className="text-xl" key={index}>
                        {line}
                      </p>
                    ))}
                  </div>
                  <div className="flex flex-col gap-3">
                    <div
                      className={`px-5 py-2 text-center rounded-[5px] ${
                        club.club_status==="active" ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      Currently {club.club_status==="active" ? "Active" : "Not Active"}
                    </div>
                    <div
                      className={`px-5 py-2 text-center cursor-pointer rounded-[5px] ${
                        club.club_status==="active" ? "bg-red-500" : "bg-green-500"
                      }`}
                      onClick={() => {
                        handleStatus(
                          club.club_id,
                          club.club_name,
                          club.club_status
                        );
                      }}
                    >
                      {club.club_status==="active" ? "Inactive" : "Active"} this club
                    </div>
                    <Link href={`/executive/contents/clubs/edit-club/${club.club_id}`} className="px-5 py-2 w-full text-center cursor-pointer rounded-[5px] bg-yellow-500">
                      Edit 
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default page;
