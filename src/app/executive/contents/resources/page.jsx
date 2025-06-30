"use client";
import SelectionInput from "../../components/SelectionInput";
import SubmitButton from "../../components/SubmitButton";
import Header from "../../../admin/Header";
// import RequestResource from "@/app/executive/components/RequestResource";
import axiosClient from "../../../../lib/axiosClient";
import React, { useEffect, useState } from "react";

const page = () => {
  const [events, setEvents] = useState([]);

  const [selectedEvent, setSelectedEvent] = useState();

  const [resources, setResources] = useState([]);

  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(-1);

  const fetchEvents = async () => {
    try {
      const response = await axiosClient.get("/executive/upcoming/events");
      const categories = await axiosClient.get("/get/category");
      if (categories.data.success) {
        setCategories([{ name: "All", id: -1 }, ...categories.data.categories]);
      }
      if (response.data.success) {
        setEvents(response.data.approved_event);
        setSelectedEvent(response.data.approved_event[0].id);
      }
    } catch (e) {
      console.log("Something went wrong");
      console.log(e);
    }
  };

  const onChange = (event) => {
    setSelectedEvent(event.target.value);
  };

  const onProcced = async () => {
    try {
      console.log(selectedEvent);
      const response = await axiosClient.get(
        "/executive/get-all-reservations",
        {
          params: {
            event_id: selectedEvent,
          },
        }
      );
      if (response.data.success) {
        console.log(response.data.resources);
        setResources(response.data.resources);
      }
    } catch (e) {
      console.log("Something went wrong");
      console.log(e);
    }
  };

  const onSubmitHandler = async (resource_id, count) => {
    try {
      const response = await axiosClient.post("/executive/resource-request", {
        event_id: selectedEvent,
        resource_id: resource_id,
        reservation_count: count,
      });

      if (response.data.success) {
        console.log("Successfull");
        onProcced();
      }
      console.log(response);
    } catch (e) {
      console.log("Something Wrong Happened");
      console.log(e);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="h-full text-white">
      <Header content={"View Club Members"} />
      <div className="h-content-full mt-2 rounded-[5px] bg-white/10 pt-2 overflow-y-scroll scroll-py-2 no-scrollbar">
        <div className="p-2">
          <div>
            <SelectionInput
              elementLabel={"Select Event"}
              elementName={"event"}
              options={events}
              option_name={"name"}
              option_value={"id"}
              selectedValue={selectedEvent}
              onChangeHandler={onChange}
            />
          </div>

          <SubmitButton button_text={"Procced"} onSubmitHandler={onProcced} />
        </div>
        <div className="flex gap-3 px-5">
          {categories.map((category, index) => {
            return (
              <button
                onClick={() => {
                  setSelectedCategory(category.id);
                }}
                className={`px-5 cursor-pointer border-[3px] text-xl py-3 bg-yellow-500 rounded-[5px] ${
                  selectedCategory === category.id
                    ? "border-green-500"
                    : "border-white/10"
                }`}
                key={index}
              >
                {category.name}
              </button>
            );
          })}
        </div>

        <div className="px-2 py-3 flex flex-col gap-3">
          {resources
            .filter((item, index) => {
              console.log(selectedCategory == -1);
              return (
                selectedCategory == "-1" || selectedCategory == item.type_id
              );
            })
            .map((resource, index) => {
              return (
                <div className="p-2 text-xl flex justify-between items-center gap-10 bg-white/10 border-[2px] rounded-[5px]" key={index}>
                  <div>
                    <p>{resource.resource_name}</p>
                    <p>{resource.reservation_count}</p>
                  </div>
                  <div>
                    <p className={`px-5 py-2 rounded-[5px] text-white ${resource.is_approved?"bg-green-500":"bg-yellow-500"} text-center texl-xl`}>{resource.is_approved ? "Approved" : "Pending"}</p>
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
