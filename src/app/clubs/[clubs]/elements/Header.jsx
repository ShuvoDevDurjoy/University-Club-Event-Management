import React from "react";

const Header = ({content}) => {
  return (
    <h2 className="text-white text-2xl h-[60px] w-full bg-white/10 p-2 rounded-[5px] text-center content-center">
      {content}
    </h2>
  );
};

export default Header;
