"use client";

import SelectionInput from "../../../../../app/admin/components/SelectionInput";
import Header from "../../../../../app/admin/Header";
import axiosClientAdmin from "../../../../../lib/axiosClientAdmin";
import { notify } from "../../../../../lib/toastify";
import { useEffect, useState } from "react";

const page = () => {
  const [resources, setResources] = useState([]);

  const [club, setClub] = useState(-1);

  const [categories, setCategories] = useState([]);
  const [clubs, setClubs] = useState([]);

  const [filters, setFilters] = useState({
    club: "-1",
    category: "-1",
  });

  const fetchFilters = async () => {
    try {
      const categories = await axiosClientAdmin.get("/get/category");
      const response = await axiosClientAdmin.get("/admin/club_id_with_name");
      if (categories.data.success && response.data.success) {
        setCategories([{ name: "All", id: -1 }, ...categories.data.categories]);
        setClubs([{ club_name: "All", club_id: -1 }, ...response.data.club]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchReseravationList = async () => {
    try {
      const response = await axiosClientAdmin.get(
        "/admin/all-approval-resource"
      );
      if (response.data.success) {
        setResources(response.data.reservations);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  const onApprove = async(resource_reservation_id)=>{
    try{
        console.log(resource_reservation_id);
        const response = await axiosClientAdmin.post('/admin/approve-resource', {resource_id: resource_reservation_id});
        if(response.data.success){
            notify.success("Approved");
            fetchReseravationList();
        }
        console.log(response);
    }catch(e){
        console.log(e);
        notify.error("Something Went wrong");
    }
  }

  useEffect(() => {
    fetchReseravationList();
    fetchFilters();
  }, []);

  return (
    <div className="h-full text-white">
      <Header content={"Assign Executive"} />
      <div className="h-content-full mt-2 rounded-[5px] bg-white/10 overflow-y-scroll scroll-py-2 no-scrollbar relative">
        <div className="p-2 pt-0 sticky top-0">
          <div className="filter_container flex gap-5 items-center text-white sticky top-0 bg-cyan-600 px-5 py-1">
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
              elementName={"category"}
              elementLabel={"Selecte Category"}
              options={categories}
              option_name={"name"}
              option_value={"id"}
              element_id={"category_select_filter_reservation"}
              onChangeHandler={onChange}
            />
          </div>
          <div className="flex flex-col gap-5 overflow-y-scroll mt-3">
            {resources
              .filter((value, index) => {
                return (
                  (filters.club === "-1" || filters.club == value.club_id) &&
                  (filters.category === "-1" ||
                    filters.category == value.type_id)
                );
              })
              .map((resource, index) => {
                return (
                  <div
                    key={index}
                    className="flex gap-5 items-center justify-between bg-white/10 border-[2px] px-3 py-3 text-xl border-white rounded-[5px]"
                  >
                    <div>
                      <p className="capitalize">
                        event name: {resource.event_name}
                      </p>
                      <p className="capitalize">start: {resource.start}</p>
                      <p className="capitalize">end: {resource.end}</p>
                      <p className="capitalize">
                        resource name: {resource.resource_name}
                      </p>
                      <p className="capitalize">
                        reservation count: {resource.reservation_count}
                      </p>
                      <p className="capitalize">
                        club name: {resource.club_name}
                      </p>
                    </div>
                    <div>
                        <p onClick={()=>{onApprove(resource.resource_reservation_id)}} className="px-5 py-3 cursor-pointer bg-green-500 text-white text-xl border-[2px] border-white rounded-[5px] text-center">Approve</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
