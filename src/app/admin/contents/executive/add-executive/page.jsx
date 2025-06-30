"use client";

import React, { useEffect, useState } from "react";
import Header from "../../../elements/Header";
import Link from "next/link";
import { notify } from "../../../../../lib/toastify";
import SelectionInput from "../../../../../app/admin/components/SelectionInput";
import axiosClientAdmin from "../../../../../lib/axiosClientAdmin";
import SubmitButton from "../../../../../app/admin/components/SubmitButton";
import Head from "next/head";
import ExecutiveAssing from "../../../../../app/admin/components/ExecutiveAssing";

const page = () => {
  const [members, setMembers] = useState({});
  const [options, setOptions] = useState([]);
  const [club_id, setClubId] = useState(1);
  const [club_name, setClubName] = useState();

  const fetchExecutives = async () => {
    console.log("fetching executives for", club_id);
    try {
      const response = await axiosClientAdmin.get("/admin/ex/executives", {
        params: {
          club_id: club_id,
        },
      });

      if (response.data.success) {
        console.log("executives data:", response.data.executives);

        const result = response.data.executives.reduce((acc, item) => {
          acc[item.role_name] = {
            role_id: item.role_id,
            role_name: item.role_name,
            membership_id: item.membership_id,
            name: item.name,
            email: item.email,
            student_id: item.student_id,
          };
          return acc;
        }, {});

        console.log("formatted result:", result);
        setMembers(result);
      }
    } catch (e) {
      console.log(e.response?.data || e.message);
    }
  };

  const onChange = (event) => {
    if (event.target) {
      setClubId(event.target.value);
    }
  };

  const onSubmitHandler = async (role_id, membership_id) => {
    try {
      const response = await axiosClientAdmin.post("/admin/ex/executives", {
        club_id: club_id,
        role_id: role_id,
        member_id: membership_id,
      });

      if (response.data.success) {
        notify.success("Assigned");
        console.log(response.data);
      }
      fetchExecutives();
    } catch (e) {
      notify.error("Something Went Wrong");
    }
  };

  const fetchClubs = async () => {
    try {
      const response = await axiosClientAdmin.get("/admin/club_id_with_name");
      if (response.data.success) {
        setOptions(response.data.club);
        setClubId(response.data.club[0].club_id);
        setClubName(response.data.club[0].club_name);
      }
    } catch (e) {
      console.log("Error happened");
      console.log(e);
    }
  };

  const onDelete = async (membership_id) => {
    try {
      const response = window.confirm(
        `Do You Want to Proceed?\n \nThis will remove the Member's Membership.`
      );
      if (response) {
        const deleted = await axiosClientAdmin.delete(
          `admin/m/members/${membership_id}`
        );
        if (deleted.data.success) {
          notify.success("Membership Successfully Removed!");
          console.log(deleted.data);
          fetchExecutives();
        } else {
          notify.error("Something went Wrong");
        }
        console.log(deleted);
      }
    } catch (e) {
      console.log(e.response.data);
      notify.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    fetchClubs();
    fetchExecutives();
  }, []);

  return (
    <div className="h-full text-white">
      <Header content={"Assign Executive"} />
      <div className="h-content-full mt-2 rounded-[5px] bg-white/10 pt-2 overflow-y-scroll scroll-py-2 no-scrollbar">
        <div className="p-2">
          <div>
            <SelectionInput
              elementLabel={"Club ID"}
              elementName={"club_id"}
              element_id={"admin_add_member_club_id"}
              changeValue={club_id}
              options={options}
              option_name={"club_name"}
              option_value={"club_id"}
              onChangeHandler={onChange}
            />
            <SubmitButton
              button_text={"Procced"}
              onSubmitHandler={fetchExecutives}
            />
          </div>
          <div className="flex flex-col gap-3">
            <ExecutiveAssing
              onSubmitHandler={onSubmitHandler}
              executive={members["President"]}
              name="President"
            />
            <ExecutiveAssing
              onSubmitHandler={onSubmitHandler}
              executive={members["General Secretary"]}
              name="General Secretary"
            />
            <ExecutiveAssing
              onSubmitHandler={onSubmitHandler}
              executive={members["Event Coordinator"]}
              name="Event Coordinator"
            />
            <ExecutiveAssing
              onSubmitHandler={onSubmitHandler}
              executive={members["Membership Manager"]}
              name="Membership Manager"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
