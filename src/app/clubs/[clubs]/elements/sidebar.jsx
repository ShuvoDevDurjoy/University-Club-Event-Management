import React, { useContext, useEffect } from 'react'
import SideLinks from '../components/links'
import { context } from '../ClubContext'

const Sidebar = () => {

  const {club_name, fetchClubName} = useContext(context);

  useEffect(()=>{
    try{
      if(! club_name){
        fetchClubName();
      }
    }catch(e){
      console.log("something went wrong in sidebar", e);
    }
  },[])

  return (
    <div className='h-full scroll-py-2 no-scrollbar snap-y bg-white/20 backdrop-blur-xl px-2 py-3 flex flex-col gap-2 rounded-[10px] overflow-y-scroll'>
      <SideLinks link_text={"Dashboard"}              link_url={"/student"}/>
      <SideLinks link_text={"View Events"}            link_url={`/clubs/${club_name}/contents/events`}/>
      <SideLinks link_text={"View Participations"}    link_url={`/clubs/${club_name}/contents/participation`}/>
      <SideLinks link_text={"View Members"}           link_url={`/clubs/${club_name}/contents/show-members`}/>

    </div>
  )
}

export default Sidebar
