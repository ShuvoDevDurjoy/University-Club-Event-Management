'use client'

import axiosClientStudent from "../../osClientStudent"
import { useEffect } from "react"

const VerifyLogin = () => {
  useEffect(()=>{
    const authVerify = async()=>{
        try{
            const response = await axiosClientStudent.get("/student/auth_verify");
        }catch(e){
            console.log("Auth Failed");
        }
    }
  },[])
}

export default VerifyLogin
