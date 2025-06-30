"use client";

import Header from '../../../elements/Header' 
import axiosClient from "../../../../../lib/axiosClient";
import { notify } from "../../../../../lib/toastify";
import Link from "next/link";
import { useEffect, useState } from "react";

const page = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const fetchedEvents = await axiosClient.get("executive/events");
      if (fetchedEvents.data.success) {
        setEvents(fetchedEvents.data.events);
        console.log(fetchedEvents.data)
    }
    console.log(fetchedEvents.data.event)
    } catch (e) {
      notify.error("Something Went Wrong");
    }
  };

  useEffect(()=>{
    fetchEvents();
  },[]);

  return (
    <div className="h-full text-white">
      <Header content={"Post New Event"} />
      <div className="h-content-full mt-2 rounded-[5px] bg-white/10 pt-2 overflow-y-scroll scroll-py-2 no-scrollbar">
        <div className="p-2">
          <div className="grid grid-cols-3 gap-3">
            {events.map((event, index) => {
              return (
                <Link href={`/executive/contents/event-participation/take-participation/${event.id}`} className="bg-white/10 p-5 rounded-[5px] border-[1px] cursor-pointer border-white/10 hover:border-white/50" key={index}>
                  <p className="text-xl capitalize">{event.name}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
