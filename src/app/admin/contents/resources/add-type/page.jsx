"use client";
import SelectionInput from "../../../../../app/admin/components/SelectionInput";
import SubmitButton from "../../../../../app/admin/components/SubmitButton";
import TextInput from "../../../../../app/admin/components/TextInput";
import Header from "../../../../../app/admin/Header";
import axiosClientAdmin from "../../../../../lib/axiosClientAdmin";
import { notify } from "../../../../../lib/toastify";
import { useState } from "react";

const page = () => {
  const [category, setCategory] = useState("");
  const [type, setType] = useState("static");

  const onSubmitHandler = async () => {
    try {
      console.log(category);
      console.log(type);
      const response = await axiosClientAdmin.post("/add/resource-type", {
        category: category,
        type: type,
      });

      if (response.data.success) {
        notify.success("Category Added Successfully");
        setCategory("");
        setType("static");
      }
    } catch (e) {
      notify.error("Something Went Wrong");
      console.log(e);
    }
  };

  return (
    <div className="h-full text-white">
      <Header content={"View Club Members"} />
      <div className="h-content-full mt-2 rounded-[5px] bg-white/10 pt-2 overflow-y-scroll scroll-py-2 no-scrollbar">
        <div className="p-2">
          <TextInput
            elementName={"category"}
            elementLabel={"New Resource Category Name"}
            changeValue={category}
            onChangeHandler={(event) => setCategory(event.target.value)}
            element_id={"add_resource_category_input_text"}
          />

          <SelectionInput
            elementName={"type"}
            elementLabel={"Resource Category Type"}
            options={[
              { name: "Static", value: "static" },
              { name: "Dynamic", value: "dynamic" },
            ]}
            selectedValue={type}
            option_name={"name"}
            option_value={"value"}
            onChangeHandler={(event) => {
              setType(event.target.value);
            }}
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
