"use client";
import { useEffect, useState } from "react";
import Header from "../../elements/Header";
import { notify } from "../../../../lib/toastify";
import axiosClientStudent from "../../../../lib/axiosClientStudent";
import Link from "next/link";

const page = () => {
  const [pendingRequst, setPendingRequest] = useState([]);
  const [memberships, setMemberships] = useState([]);

  const fetchMemberships = async () => {
    try {
      const response = await axiosClientStudent.get("/student/memberships");
      if (response.data.success) {
        setMemberships(response.data.memberships);
        console.log(response.data.memberships);
      } else {
        notify.error("Something Went Wrong");
      }
    } catch (e) {
      notify.error(e.response.data.message || "Something Went Wrong");
    }
  };

  const fetchPendingRequest = async () => {
    try {
      const response = await axiosClientStudent.get("/student/s/members");
      if (response.data.success) {
        setPendingRequest(response.data.membership_request);
        console.log(response.data.membership_request);
      } else {
        notify.error("Something Went Wrong");
      }
    } catch (e) {
      notify.error(e.response.data.message || "Something Went Wrong");
    }
  };

  useEffect(() => {
    fetchPendingRequest();
    fetchMemberships();
  }, []);

  return (
    <div className="h-full text-white">
      <Header content={"Edit Event"} />
      <div className="h-content-full mt-2 rounded-[5px] bg-white/10 pt-2 overflow-y-scroll scroll-py-2 no-scrollbar">
        <div className="p-2">
          <div className="h-full text-white flex flex-col gap-3">
            <div className="w-full rounded-[5px] bg-white/10 p-3">
              <h2 className="px-5 py-3 text-center bg-white/20 rounded-[5px] text-xl">
                Memberships
              </h2>
              <div className="grid grid-cols-3 gap-3 mt-3">
                {memberships.map((request, index) => {
                  return (
                    <Link
                      href={`/clubs/${request.club_name.toLowerCase().replace(/ /g, '_')}`} 
                      target="/_blank"
                      className="p-5 flex flex-col gap-3 bg-white/10 rounded-[5px] border-white/10 border-[1px] hover:border-white/50"
                      key={index}
                    >
                      <p className="text-2xl text-center">{request.club_name}</p>
                      <p className="text-yellow-200">
                        Requested on:{" "}
                        {new Date(request.approved_at).toLocaleString()}
                      </p>
                      <p>Membership ID: {request.membership_id}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="w-full rounded-[5px] bg-white/10 p-3">
              <h2 className="px-5 py-3 text-center bg-white/20 rounded-[5px] text-xl">
                Pending Membership Requests
              </h2>
              <div className="grid grid-cols-3 gap-3 mt-3">
                {pendingRequst.map((request, index) => {
                  return (
                    <div
                      className="p-5 flex flex-col gap-3 bg-white/10 rounded-[5px] border-white/10 border-[1px] hover:border-white/50"
                      key={index}
                    >
                      <p className="text-xl text-center">{request.club_name}</p>
                      <p className="text-yellow-200">
                        Requested on:{" "}
                        {new Date(request.created_at).toLocaleString()}
                      </p>
                      <p className="w-full p-2 bg-green-500 rounded-[5px] text-center text-xl">
                        Pending
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="p-2"></div>
        </div>
      </div>
    </div>
  );
};

export default page;
