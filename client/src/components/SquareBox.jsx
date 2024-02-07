/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const circle_icon = (
  <svg viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path
        d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        stroke="#E2BE00"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </g>
  </svg>
);

const cross_icon = (
  <svg
    fill="#48D2FE"
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 92 92"
    enableBackground="new 0 0 92 92"
    xmlSpace="preserve"
    stroke="#48D2FE"
    strokeWidth="6.256"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path
        id="XMLID_732_"
        d="M70.7,64.3c1.8,1.8,1.8,4.6,0,6.4c-0.9,0.9-2,1.3-3.2,1.3c-1.2,0-2.3-0.4-3.2-1.3L46,52.4L27.7,70.7 c-0.9,0.9-2,1.3-3.2,1.3s-2.3-0.4-3.2-1.3c-1.8-1.8-1.8-4.6,0-6.4L39.6,46L21.3,27.7c-1.8-1.8-1.8-4.6,0-6.4c1.8-1.8,4.6-1.8,6.4,0 L46,39.6l18.3-18.3c1.8-1.8,4.6-1.8,6.4,0c1.8,1.8,1.8,4.6,0,6.4L52.4,46L70.7,64.3z"
      ></path>
    </g>
  </svg>
);

const SquareBox = ({
  setGameState,
  gameState,
  socket,
  currentElement,
  id,
  setCurrentPlayer,
  currentPlayer,
  finishedState,
  finishedArray,
  playingAs,
}) => {
  const [icon, setIcon] = useState(null);

  const clickOnBox = () => {
    if (playingAs !== currentPlayer) {
      return;
    }

    if (finishedState) {
      return;
    }

    if (!icon) {
      if (currentPlayer === "circle") {
        setIcon(circle_icon);
      } else {
        setIcon(cross_icon);
      }

      const myCurrentPlayer = currentPlayer;
      socket.emit("player_move_from_client", {
        state: {
          id,
          sign: myCurrentPlayer,
        },
      });
      setCurrentPlayer(currentPlayer === "circle" ? "cross" : "circle");

      setGameState((prevState) => {
        let newState = [...prevState];
        const rowIndex = Math.floor(id / 3);
        const colIndex = id % 3;
        newState[rowIndex][colIndex] = myCurrentPlayer;
        return newState;
      });
    }
  };

  return (
    <div
      onClick={clickOnBox}
      className={`box bg-[#43115B] rounded-lg flex flex-col justify-center items-center cursor-pointer text-white w-[80px] h-[80px] md:w-[90px] md:h-[90px] ${
        finishedState ? "not-allowed" : ""
      } ${finishedArray.includes(id) ? "bg-[#FFF]" : ""} ${
        currentPlayer !== playingAs ? "not-allowed" : ""
      }`}
    >
      {currentElement === "circle"
        ? circle_icon
        : currentElement === "cross"
        ? cross_icon
        : icon}
    </div>
  );
};

export default SquareBox;
