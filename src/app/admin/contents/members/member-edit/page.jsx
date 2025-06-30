'use client'

import React, { useEffect, useState } from 'react'
import Header from '../../../elements/Header'
import axiosClient from '../../axiosClient';
import Link from 'next/link';

const page = () => {

  const [members, setMembers] = useState([]);

  useEffect(()=>{
    const fetchMembers = async()=>{
      console.log("fetching members");
      try{
        const response = await axiosClient.get("/executive/m/members");
        if(response.data.success){
          console.log(response.data)
          setMembers(response.data.members);
        }
      }catch(e){
        console.log("Something Error Happened");
      }
    }

    fetchMembers();
  },[]);

  return (
    <div className='h-full text-white'>
      <Header content={"View Club Members"} />
      <div className='h-content-full mt-2 rounded-[5px] bg-white/10 pt-2 overflow-y-scroll scroll-py-2 no-scrollbar'>
        <div className="p-2">
          {
            members.length ? (
              <div className='flex flex-col gap-5'>
                {
                  members.map((member, index) => (
                    <div key={index} className='flex justify-between w-full rounded-[5px] bg-white/10 p-2 text-white'>
                      <div className='flex flex-col justify-between items-start'>
                        <h2 className='w-full flex justify-between items-center gap-4 text-xl'><span>Member Name: </span><span>{member.student.name}</span></h2>
                        <h4 className='w-full flex justify-between items-center gap-4 text-xl'><span>Member Email Address:</span><span>{member.student.email}</span></h4>
                        <h4 className='w-full flex justify-between items-center gap-4 text-xl'><span>Membership Id:</span><span>{member.membership_id}</span></h4>
                        <p className='w-full flex justify-between items-center gap-4 text-xl'><span>Membership Issued At:</span><span>{member.created_at}</span></p>
                      </div>
                      <div>
                        <div className='flex flex-col justify-between h-full gap-y-4'>
                          <Link href={`/executive/contents/member-edit/${member.membership_id}`} type="submit" className='px-5 py-2 text-xl bg-green-500 cursor-pointer rounded-[5px]'>Edit</Link>
                          <Link href={`/executive/contents/member-edit/${member.membership_id}`} type="submit" className='px-5 py-2 text-xl bg-red-500 cursor-pointer rounded-[5px]'>Delete</Link>
                        </div>
                      </div>
                    </div>
                  )
                )
                }
              </div>
            ) : (
              <p>No Member In this club</p>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default page
