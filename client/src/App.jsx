/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import tictactoeBg from "./assets/tictactoe-bg.svg";
import SquareBox from "./components/SquareBox";

const arrItems = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

function App() {
  const [gameState, setGameState] = useState(arrItems);

  return (
    <div className="w-screen h-screen bg-[#43115B] relative flex justify-center items-center">
      <img
        src={tictactoeBg}
        alt="tictactoeBg"
        className="absolute left-0 bottom-0 w-[22vh] xs:w-[16vh] sm:w-[18vh] md:w-[20vh]"
      />
      <div className="container w-full min-w-md xs:w-[96%] md:w-[80%] lg:w-[40%] xl:w-[40%] 2xl:w-[30%] bg-[#2B0040] rounded-2xl flex flex-col justify-center items-center py-2">
        <div className="turn-board w-full grid grid-cols-2 place-content-between gap-2 xs:px-4 sm:px-6 md:px-12 lg:px-12 xl:px-12 2xl:px-10 mt-4">
          <div className="tag p-3 bg-[#48D2FE]  rounded-lg text-center font-Gilroy font-bold text-lg">
            You
          </div>
          <div className="tag p-3 bg-[#E2BE00]  rounded-lg text-center font-Gilroy font-bold text-lg">
            Opponent
          </div>
        </div>
        <div className="game-board w-full grid grid-cols-3 grid-rows-3 gap-4 place-items-center xs:px-4 sm:px-6 md:px-14 lg:px-12 xl:px-16 2xl:px-20 xs:py-4 sm:py-4 md:py-8 lg:py-10 xl:py-10 2xl:p-10">
          {gameState.map((arr) => {
            return arr.map((e) => {
              return <SquareBox setGameState={setGameState} key={e} id={e} />;
            });
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
