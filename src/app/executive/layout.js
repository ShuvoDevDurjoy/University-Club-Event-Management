"use client";
import FetchCookie from "../../lib/FetchCookie";
import Dashboard from "./elements/dashboard";
import Heading from "./elements/Heading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ExecutiveLayout({ children }) {
  return (
    <div className="w-full h-full p-3 bg-blue-950">
      <FetchCookie />
      <ToastContainer />
      <Heading />
      <Dashboard children={children} />
    </div>
  );
}
