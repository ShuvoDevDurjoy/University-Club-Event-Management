"use client";
import SelectionInput from "@/app/executive/components/SelectionInput";
import SubmitButton from "@/app/executive/components/SubmitButton";
import TextArea from "@/app/executive/components/TextArea";
import TextInput from "@/app/executive/components/TextInput";
import Header from "@/app/executive/elements/Header";
import axiosClient from "../../axiosClient";
import { notify } from "../../toastify";
import { use, useEffect, useState } from "react";

const page = ({ params }) => {
  const [club, setClub] = useState({
    club_id: "",
    club_name: "",
    club_description: "",
    club_status: "active",
  });

  const status = [
    {
      name: "Active",
      value: "active",
    },
    {
      name: "Inactive",
      value: "inactive",
    },
  ];

  const { id } = use(params);

  const onChangeHandler = (event) => {
    if (event.target) {
      setClub({ ...club, [event.target.name]: event.target.value });
    }
  };

  const fetchClub = async (id) => {
    try {
      const response = await axiosClient.get(`/admin/clubs/${id}`, club);
      if (response.data.success) {
        setClub(response.data.club);
      } else {
        notify.error("Something Went Wrong");
      }
    } catch (e) {
      notify.error("Something Went Wrong");
      console.log(e)
    }
  };

  const submissionHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axiosClient.patch(`admin/clubs/${id}`, club);
      if (response.data.success) {
        notify.success(response.data.message || "Club Added Successfully");
        fetchClub(id);
      } else {
        notify.info("May happen something wrong!");
      }
    } catch (e) {
      notify.error(e.response.data.message || "Response Failed");
      console.log(e);
    }
  };

  useEffect(() => {
    fetchClub(id);
  }, []);

  return (
    <div className="h-full text-white">
      <Header content={"Update Club"} />
      <div className="h-content-full mt-2 rounded-[5px] bg-white/10 pt-2 overflow-y-scroll scroll-py-2 no-scrollbar">
        <div className="p-2 flex flex-col gap-5">
          <form onSubmit={submissionHandler}>
            <TextInput
              elementLabel={"Club Name"}
              elementName={"club_name"}
              element_id={"club_editing_name"}
              changeValue={club.club_name}
              onChangeHandler={onChangeHandler}
            />
            <TextArea
              elementLabel={"Club Description"}
              elementName={"club_description"}
              elementId={"club_editing_desc"}
              elementValue={club.club_description}
              onChangeHandler={onChangeHandler}
            />
            <SelectionInput
              elementLabel={"Club Status"}
              elementName={"club_status"}
              options={status}
              onChangeHandler={onChangeHandler}
              selectedValue={club.club_status}
              element_id={"edit_club_status"}
              option_name={"name"}
              option_value={"value"}
            />
            <SubmitButton button_text={"Update Club"}></SubmitButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
