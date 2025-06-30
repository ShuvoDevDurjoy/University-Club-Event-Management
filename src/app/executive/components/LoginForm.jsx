
'use client'

import axiosClient from "../../../lib/axiosClient";
import Image from "next/image";
import React, { useState } from "react";

const LoginForm = ({setUser, setActive}) => {
  
  const [data, setData] = useState({
    membership_id: "",
    password: ""
  })

  const handleSubmission = async(event)=>{
    event.preventDefault();
    console.log("Form is submitting");
    try{
      const response = await axiosClient.post('/executive/login',data);
      if(response.data.success){
        console.log(response.data);
        setUser(response.data.details);
        setActive(false);
      }
      else{
        console.log("Error with Login into Account", response.data);
      }

      setData({membership_id: "", password: ""});
    }catch(e){
      console.log("Error with Login into Account");
      console.error(e.response);
    }
  }

  const onChangeHandler = (event)=>{
    setData({...data, [event.target.name]: event.target.value});
  }

  return (
    <div className="fixed w-full h-full bg-white/10 backdrop-blur-[3px] top-0 left-0 z-999">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          Executive Login
        </a>
        <div className="relative w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <span className="cursor-pointer absolute top-1 right-1 w-[30px] h-[30px] content-center text-center text-xl rounded-full block" onClick={()=>{setActive(false)}}>
          <Image fill="auto" src="/icons/close_icon.png" alt="login_form_clos_icon"/>
        </span>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmission}>
              <div>
                <label
                  htmlFor="membership_id"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your MemberShip Id
                </label>
                <input
                  type="text"
                  name="membership_id"
                  id="membership_id"
                  className="bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Membership Id"
                  required=""
                  value={data.membership_id}
                  onChange={onChangeHandler}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  value={data.password}
                  onChange={onChangeHandler}
                />
              </div>
              {/* <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      for="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div> */}
              <button
                type="submit"
                className="w-full text-white bg-primary-600 duration-200 cursor-pointer hover:bg-primary-700 hover:ring-2 focus:ring-2 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
