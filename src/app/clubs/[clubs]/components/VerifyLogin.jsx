'use client'

import axios from "axios"
import { useEffect } from "react"

const VerifyLogin = () => {
  useEffect(()=>{
    const authVerify = async()=>{
        try{
            const response = await axios.get("/members/auth_verify");
        }catch(e){
            console.log("Auth Failed");
        }
    }
  },[])
}

export default VerifyLogin
