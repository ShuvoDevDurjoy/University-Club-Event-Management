"use client";
import FetchCookie from "../../../lib/FetchCookie";
import Dashboard from "./elements/dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Heading from "./elements/header";
import { ClubContext } from "./ClubContext";

export default function ExecutiveLayout({ children }) {
  const [club_name, setClubName] = useState("");
  const params = useParams();
  useEffect(() => {
    if (params && params.clubs) {
      setClubName(params.clubs);
    }
  }, []);
  return (
    <div className="w-full h-full p-3 bg-blue-950">
      <FetchCookie />
      <ToastContainer />
      <ClubContext>
        <Heading />
        <Dashboard children={children} />
      </ClubContext>
    </div>
  );
}
