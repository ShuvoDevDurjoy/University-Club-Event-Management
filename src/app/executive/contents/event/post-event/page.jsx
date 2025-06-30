"use client";
import DateInput from '../../../components/DateInput' 
import SubmitButton from "../../../components/SubmitButton";
import TextArea from "../../../components/TextArea";
import TextInput from "../../../components/TextInput";
import TimeInput from "../../../components/TimeInput";
import axiosClient from "../../../../../lib/axiosClient";
import { notify } from "../../../../../lib/toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Header from '../../../elements/Header'

const page = () => {

  const router = useRouter();

  const [event, setEvent] = useState({
    name: "",
    description: "",
    location: "",
    start_date: "",
    end_date: "",
    start_time: new Date(new Date().setHours(12, 0, 0, 0)).toLocaleTimeString(
      "en-US",
      {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }
    ),
    end_time: new Date(new Date().setHours(12, 0, 0, 0)).toLocaleTimeString(
      "en-US",
      {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }
    ),
  });

  const roundUpToNext15Minutes = (date = new Date()) => {
    const ms = 1000 * 60 * 15; // 15 minutes
    return new Date(Math.ceil(date.getTime() / ms) * ms);
  };
  const [time, setTime] = useState({
    start_time: new Date(new Date().setHours(12, 0, 0, 0)),
    end_time: new Date(new Date().setHours(12, 0, 0, 0)),
  });

  const submissionHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axiosClient.post("/executive/e/events", event);
      if (response.data.success) {
        notify.success(response.data.message || "Event Published");
        router.push('/executive/contents/event/view-event');
      } else {
        notify.info("May have some problem");
      }
    } catch (e) {
      notify.error(e.response.data.message || "Response Failed");
      console.log(e.response.data);
    }
  };

  const onChangeHandler = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const onTimeChange = (name, time) => {
    try {
      const timeIn12HrFormat = time.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      if (name === "start_time" && time.end_time <= time) {
        setTime((prev) => ({
          start_time: time,
          end_time: roundUpToNext15Minutes(new Date(time + 15 * 60000)),
        }));
      } else setTime((prev) => ({ ...prev, [name]: time }));

      setEvent({ ...event, [name]: timeIn12HrFormat });
    } catch (e) {
      console.log("Error with setting up time");
    }
  };

  return (
    <div className="h-full text-white">
      <Header content={"Post New Event"} />
      <div className="h-content-full mt-2 rounded-[5px] bg-white/10 pt-2 overflow-y-scroll scroll-py-2 no-scrollbar">
        <div className="p-2">
          <form onSubmit={submissionHandler}>
            <TextInput
              elementLabel={"Event Name"}
              elementName={"name"}
              element_id={"event_posting_name"}
              changeValue={event.name}
              onChangeHandler={onChangeHandler}
            />

            <TextArea
              elementLabel={"Event Description"}
              elementName={"description"}
              elementId={"event_posting_desc"}
              elementValue={event.description}
              onChangeHandler={onChangeHandler}
            />

            <TextInput
              elementLabel={"Event Location"}
              elementName={"location"}
              element_id={"event_posting_location"}
              changeValue={event.location}
              onChangeHandler={onChangeHandler}
            />
            <div className="flex flex-col gap-5 py-5">
              <h2 className="relative text-center py-2 px-10 text-2xl after:content-[''] after:block after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-white">
                Date
              </h2>
              <div className="flex justify-center gap-20">
                <DateInput
                  elementLabel={"Start Date"}
                  elementName={"start_date"}
                  element_id={"event_posting_start_date"}
                  changeValue={event.start_date}
                  onChangeHandler={onChangeHandler}
                />
                <DateInput
                  elementLabel={"End Date"}
                  elementName={"end_date"}
                  element_id={"event_posting_end_date"}
                  changeValue={event.end_date}
                  onChangeHandler={onChangeHandler}
                />
              </div>
            </div>
            <div className="flex flex-col gap-5 py-5">
              <div>
                <h2 className="relative text-center py-2 px-10 text-2xl after:content-[''] after:block after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-white">
                  Time
                </h2>
              </div>
              <div className="flex justify-center gap-20">
                <TimeInput
                  elementLabel={"Start Time"}
                  elementName={"start_time"}
                  // element_id={"event_posting_start_time"}
                  minTime={new Date()}
                  currentTime={time.start_time}
                  onChangeHandler={onTimeChange}
                />
                <TimeInput
                  elementLabel={"End Time"}
                  elementName={"end_time"}
                  // element_id={"event_posting_end_time"}
                  minTime={time.start_time}
                  currentTime={time.end_time}
                  onChangeHandler={onTimeChange}
                />
              </div>
            </div>
            <SubmitButton button_text={"Post Event"} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
