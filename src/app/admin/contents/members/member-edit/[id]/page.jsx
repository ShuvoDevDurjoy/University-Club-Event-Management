'use client'
import Header from '@/app/executive/elements/Header';
import React, { use, useEffect, useState } from 'react'

const page = ({params}) => {
    const {id} = use(params);

    const [data, setData] = useState({
      
    })
    
    useEffect(()=>{
      try{
        
      }catch(e){

      }
    },[])

  return (
    <div className='h-full text-white'>
        <Header content={"Edit Member"} />
        <div className='h-content-full mt-2 rounded-[5px] bg-white/10 p-2 overflow-y-scroll scroll-py-2 no-scrollbar'>
            <h1>id is : {id}</h1>
        </div>
    </div>
  )
}

export default page
