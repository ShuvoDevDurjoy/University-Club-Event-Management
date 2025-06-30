'use client'
import TextInput from "../../../components/TextInput";
import { useEffect, useState } from "react";
import SubmitButton from "../../../components/SubmitButton";
import PasswordInput from "../../../components/PasswordInput";
import Header from "../../../elements/Header";
import { notify } from "../../../../../lib/toastify";
import axiosClientAdmin from "../../../../../lib/axiosClientAdmin";
import SelectionInput from "../../../../admin/components/SelectionInput";

const AddMember = () => {

  const [options, setOptions] = useState([]);

  const [member,setMember] = useState({
    student_id: '',
    club_id: '1',
    password: '',
  })

  const onChange = (event)=>{
    if(event.target){
      setMember({...member, [event.target.name]: event.target.value});
    }
  }

  const fetchClubs = async()=>{
    try{
      const response = await axiosClientAdmin.get('/admin/club_id_with_name');
      if(response.data.success){
        setOptions(response.data.club);
        console.log(response.data);
      }
    }catch(e){
      console.log("Error happened");
    }
  }

  const onSubmit = async()=>{
    try{
        console.log(member);

        const response = await axiosClientAdmin.post('admin/m/members',member, {withCredentials: true});
        if(response.data.success){
          notify.success(response.data.message || 'Member Added Successfully');
          setMember({...member, student_id:"",password:""});
        }
        else{
          notify.warn("Something Went Wrong");
        }
    }catch(e){
      notify.error(e.response.data.message || "Something Went Wrong");
    }
  }

  useEffect(()=>{
    fetchClubs();
  },[])


  return (
    <div className="h-full text-white">
      <Header content={"Add New Club Member"} />

      {/* Flex container for dynamic height */}
      <div className="h-content-full mt-2 rounded-[5px] bg-white/10 pt-2 overflow-y-scroll">
        {/* Content container with hidden overflow */}
        <div className="p-2">
          <TextInput
            elementLabel={"Student ID"}
            elementName={"student_id"}
            element_id={"MemberRequestId"}
            changeValue={member.student_id}
            onChangeHandler={onChange}
          />

          <SelectionInput
            elementLabel={"Club ID"}
            elementName={"club_id"}
            element_id = {"admin_add_member_club_id"}
            changeValue={member.club_id}
            options={options}
            option_name={'club_name'}
            option_value={'club_id'}
            onChangeHandler={onChange}
          />

          <PasswordInput
          elementLabel={"Enter Password"}
          elementName={"password"}
          element_id={"membership_password"}
          changeValue={member.password}
          onChangeHandler={onChange}
          />
          <SubmitButton onSubmitHandler={onSubmit} button_text={"Add Memeber"} />
        </div>
      </div>
    </div>
  );
};

export default AddMember;
