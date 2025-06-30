import React from 'react'
import SideLinks from '../components/links'

const Sidebar = () => {
  return (
    <div className='h-full scroll-py-2 no-scrollbar snap-y bg-white/20 backdrop-blur-xl px-2 py-3 flex flex-col gap-2 rounded-[10px] overflow-y-scroll'>
      <SideLinks link_text={"Dashboard"}              link_url={"/student"}/>
      <SideLinks link_text={"Membership Request"}     link_url={"/student/contents/membership-request/request"}/>
      <SideLinks link_text={"Memberships"}            link_url={"/student/contents/membership-request"}/>
      <SideLinks link_text={"View Events"}            link_url={"/student/contents/events"}/>

    </div>
  )
}

export default Sidebar
