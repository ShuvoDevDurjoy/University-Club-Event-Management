"use client";
import FetchCookie from "../../../lib/FetchCookie";
import Dashboard from "./elements/dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Heading from "./elements/Heading";
import { ClubContext } from "./ClubContext";
import Sidebar from "./elements/sidebar";

export default function ExecutiveLayout({ children }) {
  const [club_name, setClubName] = useState("");
  const params = useParams();
  useEffect(() => {
    if (params && params.clubs) {
      setClubName(params.clubs);
    }
  }, [params]);

  return (
    <div className="w-full h-full p-3 bg-blue-950">
      <FetchCookie />
      <ToastContainer />
      <ClubContext>
        <Heading />
        <div className="w-full pt-2 h-grid-full gap-2 grid grid-cols-[1fr_4fr]">
          <Sidebar />
          <div className="h-full bg-white/20 rounded-[10px] p-2 overflow-hidden">
            {children}
          </div>
        </div>
      </ClubContext>
    </div>
  );
}
