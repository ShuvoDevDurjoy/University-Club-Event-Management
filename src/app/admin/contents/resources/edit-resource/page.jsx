"use client";

import Resource from "../../../../../app/admin/components/Resource";
import Header from "../../../../../app/admin/Header";
import axiosClientAdmin from "../../../../../lib/axiosClientAdmin";
import { notify } from "../../../../../lib/toastify";
import Link from "next/link";
import { useEffect, useState } from "react";

const page = () => {
  const [types, setTypes] = useState([]);

  const [selectedType, setSelectedType] = useState("");

  const fetchTypes = async () => {
    try {
      const response = await axiosClientAdmin.get("/get/category");
      if (response.data.success) {
        setTypes(response.data.categories);
        setSelectedType(response.data.categories[0].name);
        console.log(response.data);
      } else {
        notify.error("Something Went Wrong");
        console.log(response.data);
      }
    } catch (e) {
      notify.error("Something Went Wrong");
      console.log(e);
    }
  };

  const [resources, setResources] = useState([]);

  const fetchResources = async () => {
    try {
      const response = await axiosClientAdmin.get("/get/resource");
      if (response.data.success) {
        const groupedResult = response.data.resources.reduce((acc, data) => {
          if (!acc[data.type.name]) acc[data.type.name] = [];
          acc[data.type.name].push({
            id: data.id,
            name: data.name,
            count: data.resource_count,
          });
          return acc;
        }, {});

        const result = Object.entries(groupedResult).map(([key, value]) => ({
          name: key,
          values: value,
        }));
        console.log(result);
        setResources(result);
      } else {
        notify.error("Something Went Wrong");
        console.log(response.data);
      }
    } catch (e) {
      notify.error("Something Went Wrong");
      console.log(e);
    }
  };

  useEffect(() => {
    fetchTypes();
    fetchResources();
  }, []);

  return (
    <div className="h-full text-white">
      <Header content={"View Club Members"} />
      <div className="h-content-full mt-2 rounded-[5px] bg-white/10 pt-2 overflow-y-scroll scroll-py-2 no-scrollbar">
        <div className="p-2 flex-col gap-3 flex">
          <div className="flex gap-3">
            {types.map((type, index) => {
              return (
                <button
                  onClick={() => {
                    setSelectedType(type.name);
                  }}
                  className={`text-xl cursor-pointer border-[2px] border-white/10 hover:border-white/70 duration-100 px-5 py-3 bg-green-500 rounded-[5px] ${
                    selectedType === type.name ? "border-white/70" : ""
                  }`}
                >
                  {type.name}
                </button>
              );
            })}
          </div>
          <div>
            {resources &&
              resources.map((resource, index) => {
                 return <Resource key={index} data={resource} selected={selectedType}></Resource>
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
