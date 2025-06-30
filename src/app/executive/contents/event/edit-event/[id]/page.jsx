"use client";
import DateInput from "../../../../components/DateInput";
import SubmitButton from "../../../../components/SubmitButton";
import TextArea from "../../../../components/TextArea";
import TextInput from "../../../../components/TextInput";
import TimeInput from "../../../../components/TimeInput";
import Header from "../../../../elements/Header";
import axiosClient from "../../../../../../lib/axiosClient";
import { notify } from "../../../../../../lib/toastify";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

const page = ({ params }) => {

  const router = useRouter();
  const { id } = use(params);

  const [event, setEvent] = useState({
    name: "",
    description: "",
    location: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
  });

  const [time, setTime] = useState({
    start_time: new Date(new Date().setHours(12, 0, 0, 0)),
    end_time: new Date(new Date().setHours(12, 0, 0, 0)),
  });

  const [currentTimeAndDate, setCurrentDateAndTime] = useState({
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
  });

  function formatTimeToAMPM(timeStr) {
    const today = new Date();
    const fullDate = new Date(
      `${today.toISOString().split("T")[0]}T${timeStr}`
    );
    return fullDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  const fetchEvent = async (id) => {
    try {
      const fetchedEvent = await axiosClient.get(`executive/e/events/${id}`);
      if (fetchedEvent.data.success) {
        setEvent({
          ...fetchedEvent.data.event,
          start_time: formatTimeToAMPM(fetchedEvent.data.event.start_time),
          end_time: formatTimeToAMPM(fetchedEvent.data.event.end_time),
        });

        setCurrentDateAndTime({
          start_date: new Date(
            fetchedEvent.data.event.start_date +
              "T" +
              fetchedEvent.data.event.start_time
          ).toLocaleTimeString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }),
          end_date: new Date(
            fetchedEvent.data.event.end_date +
              "T" +
              fetchedEvent.data.event.end_time
          ).toLocaleTimeString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }),
        });
      } else {
        notify.error("Something Went Wrong");
      }
    } catch (e) {
      notify.error("Something Went Wrong");
    }
  };

  const DeleteHandler = async () => {
    try {
      const userResponse = window.confirm(
        "Do you want to proccedd.\n\nThis will delete the event"
      );
      if (userResponse) {
        const response = await axiosClient.delete(`executive/e/events/${id}`);
        if (response.data.success) {
          notify.success(response.data.message | "Event is Removed");
          router.push("/executive/contents/event/view-event");
        }
        else{
          notify.error("Something Went Wrong");
          fetchEvent(id);
        }
      }
    } catch (e) {
      notify.error("Something Went Wrong");
    }
  };

  const submissionHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axiosClient.patch(
        `/executive/e/events/${id}`,
        event
      );
      if (response.data.success) {
        notify.success(response.data.message || "Event Published");
        router.push('/executive/contents/event/view-event');
      } else {
        notify.info("May have some problem");
      }
    } catch (e) {
      notify.error(e.response.data.message || "Response Failed");
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

      setTime((prev) => ({ ...prev, [name]: time }));

      setEvent({ ...event, [name]: timeIn12HrFormat });
    } catch (e) {
      console.log("Error with setting up time");
    }
  };

  useEffect(() => {
    fetchEvent(id);
  }, []);

  return (
    <div className="h-full text-white">
      <Header content={"Edit Event"} />
      <div className="h-content-full mt-2 rounded-[5px] bg-white/10 pt-2 overflow-y-scroll scroll-py-2 no-scrollbar">
        <div className="p-2">
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
            <div className="flex justify-between w-full gap-5 px-3 py-3 mt-2 bg-green-500 rounded-[5px]">
              <p className="text-xl font-bold">
                Current Start Date : {currentTimeAndDate.start_date}
              </p>
              <p className="text-xl font-bold">
                Current End Date : {currentTimeAndDate.end_date}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-5 py-3">
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
          <div className="flex justify-center">
            <SubmitButton
              button_text={"Update Event"}
              onSubmitHandler={submissionHandler}
            />
            <SubmitButton
              button_text={"Delete Event"}
              onSubmitHandler={DeleteHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
