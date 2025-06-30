import React from 'react'
import SideLinks from '../components/links'

const Sidebar = () => {
  return (
    <div className='h-full scroll-py-2 no-scrollbar snap-y bg-white/20 backdrop-blur-xl px-2 py-3 flex flex-col gap-2 rounded-[10px] overflow-y-scroll'>
      <SideLinks link_text={"Dashboard"}              link_url={"/admin"}/>
      <SideLinks link_text={"Add Member"}             link_url={"/admin/contents/members/add-member"}/>
      <SideLinks link_text={"View Members"}           link_url={"/admin/contents/members/view-members"}/>
      <SideLinks link_text={"Edit Member"}            link_url={"/admin/contents/members/member-edit"}/>
      <SideLinks link_text={"Post Event"}             link_url={"/admin/contents/event/post-event"}/>
      <SideLinks link_text={"View Events"}            link_url={"/admin/contents/event/view-event"}/>
      <SideLinks link_text={"Add Club"}               link_url={"/admin/contents/clubs/add-club"}/>
      <SideLinks link_text={"Edit Clubs"}             link_url={"/admin/contents/clubs/edit-club"}/>
      <SideLinks link_text={"Take Participation"}     link_url={"/admin/contents/event-participation/take-participation"}/>
      <SideLinks link_text={"Membership Request"}     link_url={"/admin/contents/members/membership-requests"}/>
      <SideLinks link_text={"Membership Request"}     link_url={"/admin/contents/members/membership-requests"}/>
      <SideLinks link_text={"Membership Request"}     link_url={"/admin/contents/members/membership-requests"}/>
      <SideLinks link_text={"Membership Request"}     link_url={"/admin/contents/members/membership-requests"}/>
    </div>
  )
}

export default Sidebar
