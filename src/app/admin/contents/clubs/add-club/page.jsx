"use client";
import SubmitButton from "../../../../../app/executive/components/SubmitButton";
import TextArea from "../../../../../app/executive/components/TextArea";
import TextInput from "../../../../../app/executive/components/TextInput";
import Header from "../../../../../app/executive/elements/Header";
import axiosClient from "../../../../../lib/axiosClient";
import { notify } from "../../../../../lib/toastify";
import { useState } from "react";

const page = () => {
  const [club, setClub] = useState({
    club_name: "",
    club_desc: "",
  });

  const submissionHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axiosClient.post("/admin/clubs", club);
      if (response.data.success) {
        notify.success(response.data.message || "Club Added Successfully");
      } else {
        notify.info("May happen something wrong!");
      }
    } catch (e) {
      notify.error(e.response.data.message || "Response Failed");
    }
  };

  const onChangeHandler = (e) => {
    setClub({ ...club, [e.target.name]: e.target.value });
  };
  return (
    <div className="h-full text-white">
      <Header content={"Add New Club"} />
      <div className="h-content-full mt-2 rounded-[5px] bg-white/10 pt-2 overflow-y-scroll scroll-py-2 no-scrollbar">
        <div className="p-2">
          <form onSubmit={submissionHandler}>
            <TextInput
              elementLabel={"Club Name"}
              elementName={"club_name"}
              element_id={"club_posting_name"}
              changeValue={club.event_name}
              onChangeHandler={onChangeHandler}
            />
            <TextArea
              elementLabel={"Club Description"}
              elementName={"club_desc"}
              elementId={"club_posting_desc"}
              elementValue={club.event_desc}
              onChangeHandler={onChangeHandler}
            />
            <SubmitButton button_text={"Add Club"} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
