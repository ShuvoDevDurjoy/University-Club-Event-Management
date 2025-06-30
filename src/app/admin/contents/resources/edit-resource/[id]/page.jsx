"use client";

import SubmitButton from "../../../../components/SubmitButton";
import TextInput from "../../../../components/TextInput";
import axiosClientAdmin from "../../../../../../lib/axiosClientAdmin";
import { notify } from "../../../../../../lib/toastify";
import { use, useEffect, useState } from "react";

const page = ({ params }) => {
  const { id } = use(params);

  const [type, setType] = useState("");

  const [resource, setResource] = useState({
    id: "",
    name: "",
    resource_count: "",
    type_id: "",
    type_name: "",
  });

  const onCountChange = (event) => {
    if (type === "static") {
      setResource({ ...resource, resource_count: 1 });
    } else {
      const match = event.target.value.match(/^[1-9]\d*$/);
      if (match) {
        setResource({ ...resource, resource_count: event.target.value });
      }
    }
  };

  const getResource = async () => {
    try {
      const response = await axiosClientAdmin.get(`/get/resource/${id}`);
      if (response.data.success) {
        setResource(response.data.resource);
        setType(response.data.resource.type_name);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onChange = (event) => {
    if (event.target) {
      setResource({ ...resource, [event.target.name]: event.target.value });
    }
  };

  const onSubmit = async () => {
    try {
      console.log(resource);
      const response = await axiosClientAdmin.patch(
        `/update/resource/${id}`,
        resource
      );
      if (response.data.success) {
        notify.success(response.data.message);
        console.log(response.data.resource);
        getResource();
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
    getResource();
  }, []);
  return (
    <div>
      <TextInput
        elementName={"name"}
        elementLabel={"Resource Name"}
        changeValue={resource.name}
        element_id={"add_resource_input_text"}
        onChangeHandler={onChange}
      />

      {resource.type_name !== "static" && (
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
            name={"resource_count"}
            value={resource.resource_count}
            min={1}
            max={type === "static" ? "1" : ""}
            onChange={onCountChange}
          ></input>
        </div>
      )}

      <SubmitButton button_text={"Add Resource"} onSubmitHandler={onSubmit} />
    </div>
  );
};

export default page;
