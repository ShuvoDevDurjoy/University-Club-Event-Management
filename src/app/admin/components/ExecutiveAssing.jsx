'use client'
import Header from "../Header";
import TextInput from "./TextInput";
import SubmitButton from "./SubmitButton";
import { useState } from "react";

const ExecutiveAssing = ({ executive, name, onSubmitHandler }) => {
    const [membership_id, setMembershipId] = useState("");
    const onChangeHandler = (event)=>{
        if(event.target){
            setMembershipId(event.target.value);
        }
    }
  return (
    <div className="flex flex-col gap-3">
      <Header content={name} />
      {executive && executive.membership_id ? (
        <div className="px-10">
          <Header content={`Current ${name}`} />
          <div className="bg-white/10 mt-3 rounded-[5px]">
            {executive && executive.membership_id ? (
              <div className="flex gap-10 justify-between p-3 rounded-[5px]">
                <div className="">
                  <p className="flex justify-between gap-30">
                    <span className="text-xl">Name: </span>
                    <span className="text-xl">{executive.name}</span>
                  </p>
                  <p className="flex justify-between gap-30">
                    <span className="text-xl">Email: </span>
                    <span className="text-xl">{executive.email}</span>
                  </p>
                  <p className="flex justify-between gap-30">
                    <span className="text-xl">Membership ID: </span>
                    <span className="text-xl">{executive.membership_id}</span>
                  </p>
                  <p className="flex justify-between gap-30">
                    <span className="text-xl">Student: </span>
                    <span className="text-xl">{executive.name}</span>
                  </p>
                  <p className="flex justify-between gap-30">
                    <span className="text-xl">Role: </span>
                    <span className="text-xl">{executive.role_name}</span>
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center px-5">
                  <p className="px-5 text-xl py-3 bg-red-500 rounded-[5px] cursor-pointer text-center content-center">
                    Delete
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white min-h-[200px]">
                <TextInput
                  elementLabel={"Membership Id"}
                  elementName={"membership_id"}
                  element_id={`assing_executive_${name}`}
                  onChangeHandler={onChangeHandler}
                  changeValue={changeValue}
                />
                <SubmitButton button_text={`Assign As ${name}`} />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="px-10">
          <TextInput
            elementLabel={"Membership Id"}
            elementName={"membership_id"}
            element_id={`assing_executive_${name}`}
            onChangeHandler={onChangeHandler}
            changeValue={membership_id}
          />
          <SubmitButton button_text={`Assign As ${name}`} onSubmitHandler={()=>{onSubmitHandler(executive.role_id, membership_id)}} />
        </div>
      )}
    </div>
  );
};

export default ExecutiveAssing;
