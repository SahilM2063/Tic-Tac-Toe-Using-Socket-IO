/* eslint-disable no-unused-vars */
import React from "react";
import tictactoeBg from "./assets/tictactoe-bg.svg";

function App() {
  return (
    <div className="w-screen h-screen bg-[#43115B] relative flex justify-center items-start">
      <img
        src={tictactoeBg}
        alt="tictactoeBg"
        className="absolute left-0 bottom-0 w-[22vh]"
      />

      <div className="container xs:w-[90%] sm:w-[90%] md:min-w-[70%] lg:max-w-[60%] xl:max-w-[50%] 2xl:max-w-[40%] bg-[#2B0040] rounded-[16px] mt-16 flex flex-col justify-center items-start p-10 overflow-hidden">
        <div className="score-board w-full rounded-[14px] flex justify-between items-center h-[20%]"></div>
        <div className="main-grid w-full bg-orange-600 rounded-[14px]"></div>
      </div>
    </div>
  );
}

export default App;
