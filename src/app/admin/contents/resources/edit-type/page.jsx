"use client";

import Header from "../../../../../app/admin/Header";
import axiosClientAdmin from "../../../../../lib/axiosClientAdmin";
import { notify } from "../../../../../lib/toastify";
import Link from "next/link";
import { useEffect, useState } from "react";

const page = () => {
  const [types, setTypes] = useState([]);

  const fetchTypes = async()=>{
    try{
        const response = await axiosClientAdmin.get("/get/category");
        if(response.data.success){
          setTypes(response.data.categories);
          console.log(response.data);
        }
        else{
          notify.error("Something Went Wrong");
          console.log(response.data);
        }
    }catch(e){
      notify.error("Something Went Wrong");
      console.log(e);
    }
  }

  useEffect(()=>{
    fetchTypes();
  },[])

  return (
    <div className="h-full text-white">
      <Header content={"View Club Members"} />
      <div className="h-content-full mt-2 rounded-[5px] bg-white/10 pt-2 overflow-y-scroll scroll-py-2 no-scrollbar">
        <div className="p-2 flex-col gap-3 flex">
          {types.map((type, index) => {
            return (
              <div className="p-3 bg-white/10 flex justify-between gap-10 items-center rounded-[5px]" key={index}>
                <div>
                  <p className="text-xl">Name: {type.name}</p>
                  <p className="text-xl">Type: {type.type}</p>
                </div>
                <div className="flex flex-col px-5">
                  <Link href={`/admin/contents/resources/edit-type/${type.id}`} className="px-5 py-3 text-xl bg-yellow-500 rounded-[5px] cursor-pointer">Update</Link>
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
