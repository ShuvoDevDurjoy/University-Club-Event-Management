import { useParams } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";
export const context = createContext();

export const ClubContext = ({ children }) => {
  const [club_name, setClubName] = useState(null);
  const params = useParams();

  const fetchClubName = async () => {
    try {
        if (params && params.clubs) {
          setClubName(params.clubs);
        }
    } catch (e) {
      console.log("Something Went Wrong", e);
    }
  };

  const value = {
    club_name,
    setClubName,
    fetchClubName,
  };

  useEffect(() => {
    fetchClubName();
  }, []);

  return <context.Provider value={value}>{children}</context.Provider>;
};
