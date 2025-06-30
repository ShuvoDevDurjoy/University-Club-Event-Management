'use client'

import axiosClient from "../../axiosClient"
import axiosClientAdmin from "@/app/admin/axiosClientAdmin"
import { useEffect } from "react"

const VerifyLogin = () => {
  useEffect(()=>{
    const authVerify = async()=>{
        try{
            const response = await axiosClientAdmin.get("/admin/auth_verify");
        }catch(e){
            console.log("Auth Failed");
        }
    }
  },[])
}

export default VerifyLogin
