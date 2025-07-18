'use client'

import { useEffect } from "react";
import axiosClient from "./axiosClient";

const FetchCookie = () => {
  useEffect(()=>{
    const fetchCookie = async()=>{
      console.log("fetching cookie");
    try{
    console.log("Cookie is being fetched");
        await axiosClient.get(`${process.env.NEXT_PUBLIC_BASE_URL}/sanctum/csrf-cookie`,{withCredentials: true});
        console.log("Cookie is fetced");
    }catch(e){
      console.log(e);
      console.log("Error with fetching cookie");
    }
  }

  fetchCookie();
  },[]);
}

export default FetchCookie;
