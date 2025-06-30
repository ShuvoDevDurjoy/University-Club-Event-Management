'use client';
import { useEffect, useState } from 'react';
import SideLinks from '../components/links'

const Sidebar = () => {

  const [selected, setSelected] = useState("Dashboard")

  useEffect(()=>{
    console.log(selected);
  },[selected])

  return (
    <div className='h-full scroll-py-2 no-scrollbar snap-y bg-white/20 backdrop-blur-xl px-2 py-3 flex flex-col gap-2 rounded-[10px] overflow-y-scroll'>
      <SideLinks link_text={"Dashboard"}          setSelected={setSelected} selected={selected}     link_url={"/admin"}/>
      <SideLinks link_text={"Add Member"}         setSelected={setSelected} selected={selected}     link_url={"/admin/contents/members/add-member"}/>
      <SideLinks link_text={"View Members"}       setSelected={setSelected} selected={selected}     link_url={"/admin/contents/members/view-members"}/>
      <SideLinks link_text={"Assign Executive"}   setSelected={setSelected} selected={selected}     link_url={"/admin/contents/executive/add-executive"}/>
      <SideLinks link_text={"View Events"}        setSelected={setSelected} selected={selected}     link_url={"/admin/contents/event"}/>
      <SideLinks link_text={"Add Club"}           setSelected={setSelected} selected={selected}     link_url={"/admin/contents/clubs/add-club"}/>
      <SideLinks link_text={"Edit Clubs"}         setSelected={setSelected} selected={selected}     link_url={"/admin/contents/clubs/edit-club"}/>
      <SideLinks link_text={"Add Resource Type"}  setSelected={setSelected} selected={selected}     link_url={"/admin/contents/resources/add-type/"}/>
      <SideLinks link_text={"Edit Resource Type"} setSelected={setSelected} selected={selected}     link_url={"/admin/contents/resources/edit-type"}/>
      <SideLinks link_text={"Add Resource"}       setSelected={setSelected} selected={selected}     link_url={"/admin/contents/resources/add-resource/"}/>
      <SideLinks link_text={"Edit Resource"}      setSelected={setSelected} selected={selected}     link_url={"/admin/contents/resources/edit-resource/"}/>
      <SideLinks link_text={"Approve Resource"}   setSelected={setSelected} selected={selected}     link_url={"/admin/contents/resources/reserve/"}/>
      <SideLinks link_text={"Approve Event"}      setSelected={setSelected} selected={selected}     link_url={"/admin/contents/event"}/>
    </div>
  )
}

export default Sidebar
