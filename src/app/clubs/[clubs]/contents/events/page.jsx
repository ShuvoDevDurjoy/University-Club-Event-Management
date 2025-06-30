"use client";
import { notify } from "../../../../../lib/toastify";
import Header from "../../elements/Header";
import { useContext, useEffect, useState } from "react";
import axiosClientMember from "../../../../../lib/axiosClientMember";
import { context } from "../../ClubContext";
const page = () => {
  const [selected, setSelected] = useState("ongoing");

  const { club_name, fetchClubName } = useContext(context);

  const [events, setEvents] = useState({
    upcoming: [],
    ongoing: [],
    past: [],
  });

  useEffect(() => {
    if (!club_name) return; // 🛑 wait until club_name is ready
    const fetchEvents = async () => {

      try {
        const response = await axiosClientMember.get(
          `/clubs/${club_name}/events`
        );
        if (response.data.success) {
          setEvents(response.data.events);
          console.log(response.data);
        }
      } catch (e) {
        notify.error("Something went Wrong");
        console.log(e);
      }
    };

    fetchEvents();
  }, [club_name]); // ✅ Only fetch when club_name is available

  return (
    <div className="h-full text-white">
      <Header content={"Edit Event"} />
      <div className="h-content-full mt-2 rounded-[5px] bg-white/10 pt-2 overflow-y-scroll scroll-py-2 no-scrollbar">
        <div className="p-2 flex flex-col gap-3">
          <div className="filter_container flex justify-around">
            <button
              onClick={() => {
                setSelected("ongoing");
              }}
              className={`px-5 py-3 cursor-pointer text-xl bg-green-500 rounded-[5px] border-[5px] ${
                selected === "ongoing" ? "border-white/70" : "border-white/10"
              }`}
            >
              Ongoing Events
            </button>
            <button
              onClick={() => {
                setSelected("upcoming");
              }}
              className={`px-5 py-3 cursor-pointer text-xl bg-yellow-500 rounded-[5px] border-[5px] ${
                selected === "upcoming" ? "border-white/70" : "border-white/10"
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => {
                setSelected("past");
              }}
              className={`px-5 py-3 cursor-pointer text-xl bg-red-500 rounded-[5px] border-[5px] ${
                selected === "past" ? "border-white/70" : "border-white/10"
              }`}
            >
              Past Events
            </button>
          </div>

          <div>
            <div className={`${selected === "ongoing" ? "block" : "hidden"}`}>
              {events.ongoing.map((event, index) => {
                return (
                  <div
                    key={index}
                    className="my-3 bg-white/5 p-2 rounded-[5px] border-white/20 border-[1px]"
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
                        <p className="ps-5">
                          {new Date(event.start_date_and_time).toLocaleString()}
                        </p>
                      </div>
                      <div className="p-2 bg-white/10 rounded-[5px]">
                        <h2 className="relative text-center py-2 mb-3 px-10 text-2xl after:content-[''] after:block after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-white">
                          Event End Time
                        </h2>
                        <p className="ps-5">
                          {new Date(event.end_date_and_time).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={`${selected === "upcoming" ? "block" : "hidden"}`}>
              {events.upcoming.map((event, index) => {
                return (
                  <div
                    key={index}
                    className="my-3 bg-white/5 p-2 rounded-[5px] border-white/20 border-[1px]"
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
                        <p className="ps-5">
                          {new Date(event.start_date_and_time).toLocaleString()}
                        </p>
                      </div>
                      <div className="p-2 bg-white/10 rounded-[5px]">
                        <h2 className="relative text-center py-2 mb-3 px-10 text-2xl after:content-[''] after:block after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-white">
                          Event End Time
                        </h2>
                        <p className="ps-5">
                          {new Date(event.end_date_and_time).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={`${selected === "past" ? "block" : "hidden"}`}>
              {events.past.map((event, index) => {
                return (
                  <div
                    key={index}
                    className="my-3 bg-white/5 p-2 rounded-[5px] border-white/20 border-[1px]"
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
                        <p className="ps-5">
                          {new Date(event.start_date_and_time).toLocaleString()}
                        </p>
                      </div>
                      <div className="p-2 bg-white/10 rounded-[5px]">
                        <h2 className="relative text-center py-2 mb-3 px-10 text-2xl after:content-[''] after:block after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-white">
                          Event End Time
                        </h2>
                        <p className="ps-5">
                          {new Date(event.end_date_and_time).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
