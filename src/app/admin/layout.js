"use client";
import FetchCookie from "../../lib/FetchCookie";
import Dashboard from "./elements/dashboard";
import Heading from "./elements/Heading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./elements/sidebar";

export default function ExecutiveLayout({ children }) {
  return (
    <div className="w-full h-full p-3 bg-blue-950">
      <FetchCookie />
      <ToastContainer />
      <Heading />
      <div className="w-full pt-2 h-grid-full gap-2 grid grid-cols-[1fr_4fr]">
        <Sidebar />
        <div className="h-full bg-white/20 rounded-[10px] p-2 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
