/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import circle_icon from "../assets/circle_icon.svg";
import cross_icon from "../assets/cross_icon.svg";

const SquareBox = ({ setGameState, id }) => {
  const [icon, setIcon] = useState(cross_icon);
  return (
    <div className="bg-[#43115B] rounded-lg flex flex-col justify-center items-center cursor-pointer text-white w-[80px] h-[80px] md:w-[90px] md:h-[90px]">
      <img src={icon} alt="icon" className="w-[60%]" />
    </div>
  );
};

export default SquareBox;
