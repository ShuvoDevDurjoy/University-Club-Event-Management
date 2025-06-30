'use client'
import SelectionInput from "../../../components/SelectionInput";
import SubmitButton from "../../../components/SubmitButton";
import Header from "../../../elements/Header";
import axiosClient from "../../../../../lib/axiosClient";
import { notify } from "../../../../../lib/toastify";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {

  const router = useRouter();

  const [club_id, setClubId] = useState();

  const [options, setOptions] = useState([]);

  const fetchClubs = async () => {
    try {
      const response = await axiosClient.get(
        "/executives/api/club_id_with_name"
      );
      console.log("data is : ", response.data);
      setOptions(response.data.club);
      setClubId(response.data.club[0].club_id);
    } catch (e) {
      console.log("Response Fetch Failed");
    }
  };

  const onChange = (event) => {
    if (event.target) {
      setClubId(event.target.value);
    }
  };

  const onSubmitHandler = async()=>{
    try{
        const response = await axiosClient.post('/student/s/members', {club_id: club_id});
        if(response.data.success){
          notify.success("Membership Request Made Successfull");
          router.push('/student/contents/membership-request');
        }
        else{
          notify.error(response.data.message || "Something Went Wrong");
        }
    }catch(e){
      notify.error(e.response.data.message||"Something Went Wrong, Submit Again");
      console.log(e.response.data)
    }
  }

  useEffect(() => {
    fetchClubs();
  }, []);

  return (
    <div className="h-full text-white">
      <Header content={"Request Membership"} />
      <div className="h-content-full mt-2 rounded-[5px] bg-white/10 pt-2 overflow-y-scroll scroll-py-2 no-scrollbar">
        <div className="p-2">
          <SelectionInput
            elementLabel={"Club ID"}
            elementName={"club_id"}
            options={options}
            onChangeHandler={onChange}
            selected_value={club_id}
            element_id={"MemberRoleId"}
            option_name={"club_name"}
            option_value={"club_id"}
          />

          <SubmitButton button_text={"Request Membership"} onSubmitHandler={onSubmitHandler} />
        </div>
      </div>
    </div>
  );
};

export default page;
