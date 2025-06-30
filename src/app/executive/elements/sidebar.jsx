import React from 'react'
import SideLinks from '../components/links'

const Sidebar = () => {
  return (
    <div className='h-full scroll-py-2 no-scrollbar snap-y bg-white/20 backdrop-blur-xl px-2 py-3 flex flex-col gap-2 rounded-[10px] overflow-y-scroll'>
      <SideLinks link_text={"Dashboard"}              link_url={"/executive"}/>
      <SideLinks link_text={"Add Member"}             link_url={"/executive/contents/members/add-member"}/>
      <SideLinks link_text={"View Members"}           link_url={"/executive/contents/members/view-members"}/>
      <SideLinks link_text={"Edit Member"}            link_url={"/executive/contents/members/member-edit"}/>
      <SideLinks link_text={"Post Event"}             link_url={"/executive/contents/event/post-event"}/>
      <SideLinks link_text={"View Events"}            link_url={"/executive/contents/event/view-event"}/>
      <SideLinks link_text={"Take Participation"}     link_url={"/executive/contents/event-participation/take-participation"}/>
      <SideLinks link_text={"Membership Request"}     link_url={"/executive/contents/members/membership-requests"}/>
      <SideLinks link_text={"Resource Request"}       link_url={"/executive/contents/resources/resource-request"}/>
      <SideLinks link_text={"View Resource Request"}  link_url={"/executive/contents/resources"}/>
    </div>
  )
}

export default Sidebar
