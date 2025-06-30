"use client";
import SelectionInput from "../../../components/SelectionInput";
import SubmitButton from "../../../components/SubmitButton";
import Header from "../../../../admin/Header";
import RequestResource from "../../../components/RequestResource";
import axiosClient from "../../../../../lib/axiosClient";
import React, { useEffect, useState } from "react";

const page = () => {
  const [events, setEvents] = useState([]);

  const [selectedEvent, setSelectedEvent] = useState();

  const [resources, setResources] = useState([]);

  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState();


  const fetchEvents = async () => {
    try {
      const response = await axiosClient.get("/executive/upcoming/events");
      const categories = await axiosClient.get("/get/category");
      if (categories.data.success) {
        setCategories(categories.data.categories);
        setSelectedCategory(categories.data.categories[0].name);
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
      const response = await axiosClient.get("/executive/rr/resources", {
        params: {
          event_id: selectedEvent,
        },
      });
      if (response.data.success) {
        const groupedResult = response.data.resources.reduce((acc, item) => {
          if (!acc[item.name]) {
            acc[item.name] = [];
          }
          acc[item.name].push({
            id: item.id,
            resource_id: item.resource_id,
            available: item.available,
            name: item.resource_name,
            type: item.type,
          });

          return acc;
        }, {});

        const result = Object.entries(groupedResult).map(([key, value]) => ({
          name: key,
          values: value,
        }));
        console.log(response.data.resources);
        console.log(result);
        setResources(result);
      }
    } catch (e) {
      console.log("Something went wrong");
      console.log(e);
    }
  };


  const onSubmitHandler = async(resource_id, count)=>{
    try{
      const response = await axiosClient.post("/executive/rr/resources", {
        event_id: selectedEvent,
        resource_id: resource_id,
        reservation_count: count
      });

      if(response.data.success){
        console.log("Successfull");
        onProcced();
      }
      console.log(response);
    }catch(e){
      console.log("Something Wrong Happened");
      console.log(e);
    }
  }

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
                  setSelectedCategory(category.name);
                }}
                className={`px-5 cursor-pointer border-[3px] text-xl py-3 bg-yellow-500 rounded-[5px] ${
                  selectedCategory === category.name
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

        <div className="px-2 py-3">
          {resources.map((resource, index) => {
            return (
              <div
                className={`
                  flex flex-col gap-3 px-2 py-3
                  ${resource.name === selectedCategory ? "block" : "hidden"}`}
                key={index}
              >
                {resource.values.map((item, ind) => {
                  return <RequestResource item={item} key={ind} onSubmitHadler={onSubmitHandler} />
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default page;
