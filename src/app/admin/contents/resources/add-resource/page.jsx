"use client";
import SubmitButton from "../../../../../app/admin/components/SubmitButton";
import TextInput from "../../../../../app/admin/components/TextInput";
import Header from "../../../../../app/admin/Header";
import axiosClientAdmin from "../../../../../lib/axiosClientAdmin";
import { notify } from "../../../../../lib/toastify";
import { useEffect, useState } from "react";

const page = () => {
  const [resource, setResource] = useState({
    name: "",
    type_id: "",
    count: 1,
  });

  const [type, setType] = useState("");

  const [options, setOptions] = useState([]);

  const fetchOptions = async () => {
    try {
      const response = await axiosClientAdmin.get("/get/category");
      if (response.data.success) {
        setOptions(response.data.categories);
        setResource({ ...resource, type_id: response.data.categories[0].id });
        setType(response.data.categories[0].type);
      }
    } catch (e) {
      notify.error("Something Went Wrong");
      console.log(e);
    }
  };

  const onSelectionChange = (event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedOptions = event.target.options[selectedIndex];
    const selectedType = selectedOptions.getAttribute("data-type");
    setResource({
      ...resource,
      [event.target.name]: event.target.value,
      count: 1,
    });
    setType(selectedType);
  };

  const onChange = (event) => {
    if (event.target) {
      setResource({ ...resource, [event.target.name]: event.target.value });
    }
  };

  const onCountChange = (event) => {
    if (type === "static") {
      setResource({ ...resource, count: 1 });
    } else {
      console.log(event.target.value);
      const match = event.target.value.match(/^[1-9]\d*$/);
      console.log(match);
      if (match) {
        setResource({ ...resource, count: event.target.value });
      }
    }
  };

  const onSubmit = async () => {
    try {
      console.log(resource);
      const response = await axiosClientAdmin.post("/add/resources", resource);
      if (response.data.success) {
        notify.success(response.data.message);
      }
    } catch (e) {
      if (e.response) {
        notify.error(e.response.message || "Something Went Wrong");
      } else {
        notify.error("Something Went Wrong");
      }
      console.log(e);
    }
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  return (
    <div className="h-full text-white">
      <Header content={"View Club Members"} />
      <div className="h-content-full mt-2 rounded-[5px] bg-white/10 pt-2 overflow-y-scroll scroll-py-2 no-scrollbar">
        <div className="p-2">
          <TextInput
            elementName={"name"}
            elementLabel={"Resource Name"}
            changeValue={resource.name}
            element_id={"add_resource_input_text"}
            onChangeHandler={onChange}
          />

          <div className={`mb-3`}>
            <label
              htmlFor="resource-input-select-input "
              className="block text-xl font-bold mb-1 text-gray-100 whitespace-nowrap"
            ></label>
            <select
              id="resource-input-select-input"
              className="appearance-none outline-none w-full min-w-[200px] p-[10px] capitalize border-2 border-white/20 rounded-[5px] text-xl text-black-100"
              name="type_id"
              value={resource.type_id}
              onChange={onSelectionChange}
            >
              {options.map((option, index) => {
                return (
                  <option
                    className=" text-black capitalize"
                    name={"type_id"}
                    value={option.id}
                    key={index}
                    data-type={option.type}
                  >
                    {option.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className={`mb-3`}>
            <label
              className="block text-xl font-bold mb-1 text-gray-100 whitespace-nowrap"
              htmlFor="rosource-count"
            >
              {"Resource Count"}
            </label>
            <input
              id={"resource-count"}
              className="outline-none w-full min-w-[200px] p-[10px] border-2 border-white/20 rounded-[5px] text-xl text-gray-100"
              type="number"
              name={"count"}
              value={resource.count}
              min={1}
              max={type === "static" ? "1" : ""}
              onChange={onCountChange}
            ></input>
          </div>

          <SubmitButton
            button_text={"Add Resource"}
            onSubmitHandler={onSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
