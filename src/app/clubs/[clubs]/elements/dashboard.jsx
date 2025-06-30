import React from "react";
import Sidebar from "./sidebar";

const Dashboard = ({ children, club_name }) => {
  return (
    <div className="w-full pt-2 h-grid-full gap-2 grid grid-cols-[1fr_4fr]">
        <Sidebar club_name={club_name} />
      <div className="h-full bg-white/20 rounded-[10px] p-2 overflow-hidden">
          {children}
      </div>
    </div>
  );
};

export default Dashboard;

/*


      </div>
      <div className='h-full p-3'>
        <div className='h-full rounded-[10px] bg-white/20 p-2'>
          {children}
        </div>
      </div>


*/
