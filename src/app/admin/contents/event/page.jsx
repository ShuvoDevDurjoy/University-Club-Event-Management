"use client";

import Header from "../../../../app/executive/elements/Header";
import axiosClientAdmin from "../../../../lib/axiosClientAdmin";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SelectionInput from "../../components/SelectionInput";
import { notify } from "../../../../lib/toastify";

const page = () => {
  const [events, setEvents] = useState([]);

  const [clubs, setClubs] = useState([]);
  const [status, setStatus] = useState([
    { name: "All", value: -1 },
    { name: "Approved", value: 1 },
    { name: "Not Approved", value: 0 },
  ]);

  const [filters, setFilters] = useState({
    club: "-1",
    status: -1,
  });

  const fetchFilters = async () => {
    try {
      const response = await axiosClientAdmin.get("/admin/club_id_with_name");
      if (response.data.success) {
        setClubs([{ club_name: "All", club_id: -1 }, ...response.data.club]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onChange = (event) => {
    console.log(event.target.name);
    console.log(event.target.value);
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  const fetch = async () => {
    console.log("fetching events");
    try {
      const response = await axiosClientAdmin.get("/admin/upcoming-events");
      if (response.data.success) {
        setEvents(response.data.events);
      }
    } catch (e) {
      console.log("Error with getting all the events");
    }
  };

  const onUpdateHandler = async (id) => {
    try {
      const response = await axiosClientAdmin.patch(
        `/admin/event/update-status/${id}`
      );

      const userResponse = window.confirm(
        "Are you sure that you want to take this action"
      );

      if (userResponse) {
        if (response.data.success) {
          notify.success("Event Status Change Successfull");
          fetch();
        }
        
      }
    } catch (e) {
      console.log("Exception Occurs");
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="h-full text-white">
      <Header content={"View Club Events"} />
      <div className="h-content-full mt-2 rounded-[5px] bg-white/10 overflow-y-scroll scroll-py-2 no-scrollbar">
        <div className="p-2 flex flex-col gap-y-5">
          <div className="filter_container flex gap-5 items-center text-white sticky top-0 bg-cyan-600 px-5 py-1 z-999">
            <p className="px-5 py-3 text-xl mr-5 text-white bg-white/10">
              Filters
            </p>
            <SelectionInput
              elementName={"club"}
              elementLabel={"Selecte Clubs"}
              options={clubs}
              option_name={"club_name"}
              option_value={"club_id"}
              element_id={"club_select_filter_reservation"}
              onChangeHandler={onChange}
            />
            <SelectionInput
              elementName={"status"}
              elementLabel={"Selecte Status"}
              options={status}
              option_name={"name"}
              option_value={"value"}
              element_id={"status_select_filter_reservation"}
              onChangeHandler={onChange}
            />
          </div>
          <div>
            {events.length ? (
              events
                .filter((value, index) => {
                  console.log(value);
                  console.log(filters);
                  console.log(filters.club == "-1");
                  console.log(filters.status == "-1");
                  return (
                    (filters.club == "-1" || filters.club == value.club_id) &&
                    (filters.status == "-1" ||
                      filters.status == value.is_approved)
                  );
                })
                .map((event, index) => {
                  return (
                    <div
                      key={index}
                      className="bg-white/5 p-2 rounded-[5px] border-white/20 border-[1px]"
                    >
                      {/* <p>{event.id}</p> */}
                      <h2 className="text-2xl text-center bg-white/10 rounded-[5h2x] p-3">
                        {event.name}
                      </h2>
                      <div className="grid grid-cols-[1fr_300px] gap-3 my-3 rounded-[5px]">
                        <div className="p-5 rounded-[10px] bg-white/20">
                          <h2 className="relative text-center py-2 mb-3 px-10 text-2xl after:content-[''] after:block after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-white">
                            Event Details
                          </h2>
                          {event.description.split("\n").map((line, index) => (
                            <p key={index}>{line}</p>
                          ))}
                        </div>
                        <div className="bg-white/20 p-5 rounded-[5px]">
                          <h2 className="relative text-center py-2 mb-3 px-10 text-2xl after:content-[''] after:block after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-white">
                            Event Venue
                          </h2>
                          <p>{event.location}</p>
                        </div>
                      </div>
                      <div className="grid gap-3 mb-3 grid-cols-2">
                        <div className="p-2 bg-white/10 rounded-[5px]">
                          <h2 className="relative text-center py-2 mb-3 px-10 text-2xl after:content-[''] after:block after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-white">
                            Event Start Time
                          </h2>
                          <p className="ps-5">{event.start}</p>
                        </div>
                        <div className="p-2 bg-white/10 rounded-[5px]">
                          <h2 className="relative text-center py-2 mb-3 px-10 text-2xl after:content-[''] after:block after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-white">
                            Event End Time
                          </h2>
                          <p className="ps-5">{event.end}</p>
                        </div>
                      </div>
                      <div>
                        <p
                          onClick={() => {
                            onUpdateHandler(event.id);
                          }}
                          className={`${
                            event.is_approved ? "bg-red-500" : "bg-green-500"
                          } px-5 py-2 text-center text-xl rounded-[5px] cursor-pointer`}
                        >
                          {event.is_approved
                            ? "Remove Approval"
                            : "Approve Event"}
                        </p>
                      </div>
                    </div>
                  );
                })
            ) : (
              <p>No Event Available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
