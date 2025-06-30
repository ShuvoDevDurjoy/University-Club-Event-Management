'use client'

import axiosClient from "../../axiosClient"
import { useEffect } from "react"

const VerifyLogin = () => {
  useEffect(()=>{
    const authVerify = async()=>{
        try{
            const response = await axiosClient.get("/executive/auth_verify");
        }catch(e){
            console.log("Auth Failed");
        }
    }
  },[])
}

export default VerifyLogin
