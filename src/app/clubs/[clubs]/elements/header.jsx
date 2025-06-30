"use client";

import { useContext, useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import axiosClientMember from "../../../../lib/axiosClientMember";
import { useParams } from "next/navigation";
import { context } from "../ClubContext";

const Heading = () => {
  const { club_name, fetchClubName, setClubName } = useContext(context);
  const [loginData, setLoginData] = useState(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!club_name) return; // 🛑 wait for club_name
    const validateAuth = async () => {

      try {
        const response = await axiosClientMember.get(
          `clubs/${club_name}/check`,
          { withCredentials: true }
        );
        if (response.data.success) {
          setLoginData(response.data.details);
        }
      } catch (e) {
        console.log("error happened", e);
      }
    };

    validateAuth();
  }, [club_name]);

  return (
    <div className="min-w-full h-[80px]">
      <div className="h-full px-5 flex items-center justify-between bg-white/20 rounded-[10px]">
        <h1 className="text-3xl text-white font-normal">
          University Club Event Management System
        </h1>
        <div className="flex items-center gap-2 justify-between">
          <div
            className="text-white text-xl font-bold px-5 cursor-pointer py-2 bg-white/10 rounded-[10px]"
            onClick={() => {
              setActive((prev) => !prev);
            }}
          >
            {loginData ? <p>{loginData.name}</p> : "Login"}
          </div>
          {/* <p className="text-2xl text-white font-bold">Shuvo Dev</p>
          <p className="text-red-200 text-[18px]">(President)</p> */}
        </div>
      </div>

      <div className="relative">
        {active && !loginData ? (
          <LoginForm setActive={setActive} setUser={setLoginData} />
        ) : (
          loginData && (
            <div
              className={`absolute fade-in-up text-center flex flex-col justify-between text-white bg-white/10 backdrop-blur-[3px] right-0 top-2 rounded-[10px] p-2 ${
                active ? "active z-999" : "-z-1"
              }`}
            >
              <h1 className="text-3xl relative capitalize px-10 py-2 before:block before:content-[''] before:absolute before:w-full before:h-[1px] before:bg-white before:left-0 before:bottom-0 ">
                Member information
              </h1>
              <div className="px-10 py-5 flex flex-col gap-2">
                <p className="flex justify-between gap-5 text-xl">
                  <span>Name: </span>
                  <span>{loginData.name}</span>
                </p>
                <p className="flex justify-between gap-5 text-xl">
                  <span>Email Address: </span>
                  <span>{loginData.email}</span>
                </p>
                <p className="flex justify-between gap-5 text-xl">
                  <span>Student Id : </span>
                  <span>{loginData.club_name}</span>
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Heading;
