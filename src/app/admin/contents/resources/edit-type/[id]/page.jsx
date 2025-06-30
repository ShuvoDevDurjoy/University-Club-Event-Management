"use client";
import SelectionInput from "@/app/admin/components/SelectionInput";
import SubmitButton from "@/app/admin/components/SubmitButton";
import TextInput from "@/app/admin/components/TextInput";
import Header from "@/app/admin/Header";
import axiosClientAdmin from "@/app/admin/axiosClientAdmin";
import { notify } from "../../oastify";
import React, { use, useEffect, useState } from "react";

const page = ({params}) => {

    const {id} = use(params)

  const [category, setCategory] = useState({
    id: "",
    name: "",
    type: "",
  });

  const fetchCategory = async () => {
    try {
      const response = await axiosClientAdmin.get(`/get/category/${id}`);
      if (response.data.success) {
        setCategory(response.data.categories);
      } else {
        notify.error("Something Went Wrong");
      }
    } catch (e) {
      notify.error("Something Went Wrong");
    }
  };

  const onSubmitHandler = async()=>{
    try{
        const response = await axiosClientAdmin.patch("/update/category", category)
        if(response.data.success){
            notify.success("Successfull");
            fetchCategory();
        }
        else{
            notify.error("Something Went Wrong");
        }
    }catch(e){
        notify.error("Something Went Wrong");
    }
  }

  const onChangeHandler = (event)=>{
    setCategory({...category, [event.target.name]: event.target.value});
  }

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div className="h-full text-white">
      <Header content={"View Club Members"} />
      <div className="h-content-full mt-2 rounded-[5px] bg-white/10 pt-2 overflow-y-scroll scroll-py-2 no-scrollbar">
        <div className="p-2 flex-col gap-3 flex">
          <TextInput
            elementLabel={"Category Name"}
            elementName={"name"}
            changeValue={category.name}
            onChangeHandler={onChangeHandler}
            element_id={"category_edit_input_name"}
          />

          <SelectionInput
            elementName={"type"}
            elementLabel={"Resource Category Type"}
            options={[
              { name: "Static", value: "static" },
              { name: "Dynamic", value: "dynamic" }
            ]}
            selectedValue={category.type}
            option_name={"name"}
            option_value={"value"}
            onChangeHandler={onChangeHandler}
          />

          <SubmitButton
            button_text={"Add New Resource Category"}
            onSubmitHandler={onSubmitHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
