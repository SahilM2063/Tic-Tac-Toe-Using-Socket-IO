/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import tictactoeBg from "./assets/tictactoe-bg.svg";
import SquareBox from "./components/SquareBox";
import { io } from "socket.io-client";
import Swal from "sweetalert2";

const arrItems = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

function App() {
  const [gameState, setGameState] = useState(arrItems);
  const [currentPlayer, setCurrentPlayer] = useState("circle");
  const [finishedState, setFinishedState] = useState(false);
  const [finishedArray, setFinishedArray] = useState([]);
  const [playOnline, setPlayOnline] = useState(false);
  const [socket, setSocket] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [opponentName, setOpponentName] = useState(null);
  const [playingAs, setPlayingAs] = useState(null);

  const checkWinner = () => {
    // dynamic row and static column
    for (let row = 0; row < gameState.length; row++) {
      if (
        gameState[row][0] === gameState[row][1] &&
        gameState[row][1] === gameState[row][2]
      ) {
        setFinishedArray([row * 3, row * 3 + 1, row * 3 + 2]);
        return gameState[row][0];
      }
    }

    // dynamic column and static row
    for (let col = 0; col < gameState.length; col++) {
      if (
        gameState[0][col] === gameState[1][col] &&
        gameState[1][col] === gameState[2][col]
      ) {
        setFinishedArray([0 * 3 + col, 1 * 3 + col, 2 * 3 + col]);
        return gameState[0][col];
      }
    }

    // cross winning moves
    if (
      gameState[0][0] === gameState[1][1] &&
      gameState[1][1] === gameState[2][2]
    ) {
      setFinishedArray([0, 4, 8]);
      return gameState[0][0];
    }

    if (
      gameState[0][2] === gameState[1][1] &&
      gameState[1][1] === gameState[2][0]
    ) {
      setFinishedArray([2, 4, 6]);
      return gameState[0][2];
    }

    const isDrawMatch = gameState.flat().every((e) => {
      if (e === "circle" || e === "cross") return true;
    });

    if (isDrawMatch) {
      return "draw";
    }
    // console.log(isDrawMatch);

    return null;
  };

  socket?.on("player_disconnected", () => {
    setFinishedState("playerDisconnected");
  });

  socket?.on("player_move_from_server", (data) => {
    setGameState((prevState) => {
      let newState = [...prevState];
      const rowIndex = Math.floor(data.state.id / 3);
      const colIndex = data.state.id % 3;
      newState[rowIndex][colIndex] = data.state.sign;
      return newState;
    });
    setCurrentPlayer(data.state.sign === "circle" ? "cross" : "circle");
  });

  socket?.on("connect", () => {
    setPlayOnline(true);
  });

  socket?.on("opponent_Not_Found", () => {
    setOpponentName(null);
  });

  socket?.on("opponent_found", (data) => {
    // console.log(data);
    setPlayingAs(data.playingAs);
    setOpponentName(data.opponentName);
  });

  const getPlayerName = async () => {
    const result = await Swal.fire({
      title: "Enter your name",
      input: "text",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });

    return result;
  };

  const handleJoinPlayer = async () => {
    const result = await getPlayerName();

    if (!result.isConfirmed) {
      return;
    }

    const userName = result.value;
    setPlayerName(userName);

    const newSocket = io(
      "https://tic-tac-toe-backend-ohv4odvwq-makadiasahil9846-gmailcom.vercel.app/",
      {
        autoConnect: true,
      }
    );

    newSocket?.emit("request_to_play", {
      playerName: userName,
    });

    setSocket(newSocket);
  };

  useEffect(() => {
    const winner = checkWinner();
    if (winner) {
      setFinishedState(winner);
      // console.log(winner);
    }
  }, [gameState]);

  return (
    <div className="w-screen h-screen bg-[#43115B] relative flex flex-col justify-center items-center">
      <img
        src={tictactoeBg}
        alt="tictactoeBg"
        className="absolute left-0 bottom-0 w-[22vh] xs:w-[16vh] sm:w-[18vh] md:w-[20vh]"
      />
      {finishedState &&
        finishedState !== "playerDisconnected" &&
        (finishedState === "draw" ? (
          <h3 className="text-white font-Gilroy mb-2">
            Match is
            <span className="text-2xl font-medium capitalize">
              {" "}
              {finishedState} 👁️💫
            </span>
          </h3>
        ) : (
          <h3 className="text-white font-Gilroy mb-2">
            <span className="text-2xl font-medium capitalize">
              {finishedState === playingAs ? "You" : "Opponent"}{" "}
            </span>
            Won The Game! 💫✨
          </h3>
        ))}
      {!finishedState && opponentName && (
        <h3 className="text-white font-Gilroy mb-2">
          You are playing against
          <span className="text-2xl font-medium capitalize">
            {" "}
            {opponentName}
            {"✨"}
          </span>
        </h3>
      )}
      {finishedState && finishedState === "playerDisconnected" && (
        <h3 className="text-white font-Gilroy mb-2">
          Player Disconnected! You Won The Game! 💫✨
        </h3>
      )}
      {!playOnline ? (
        <button
          onClick={handleJoinPlayer}
          className="font-Gilroy font-semibold text-lg tracking-wide bg-[#E2BE00] py-4 px-6 rounded-lg"
        >
          Play Online
        </button>
      ) : playOnline && !opponentName ? (
        <p className="bg-white py-3 px-10 rounded-lg font-Gilroy font-semibold tracking-wide">
          Waiting for opponent...👀🔪
        </p>
      ) : (
        <div className="container w-full min-w-md xs:w-[96%] md:w-[80%] lg:w-[40%] xl:w-[40%] 2xl:w-[30%] bg-[#2B0040] rounded-2xl flex flex-col justify-center items-center py-2">
          <div className="turn-board w-full grid grid-cols-2 place-content-between gap-2 xs:px-4 sm:px-6 md:px-12 lg:px-12 xl:px-12 2xl:px-10 mt-4">
            <div
              className={`tag p-3 bg-[#43115B] text-white rounded-lg text-center font-Gilroy font-bold text-lg ${
                currentPlayer === playingAs ? "bg-[#FFF] text-black" : ""
              }`}
            >
              <span>{playerName}</span>
            </div>
            <div
              className={`tag p-3 bg-[#43115B] text-white rounded-lg text-center font-Gilroy font-bold text-lg ${
                currentPlayer !== playingAs ? "bg-[#FFF] text-black" : ""
              }`}
            >
              <span>{opponentName}</span>
            </div>
          </div>
          <div className="game-board w-full grid grid-cols-3 grid-rows-3 gap-4 place-items-center xs:px-4 sm:px-6 md:px-14 lg:px-12 xl:px-16 2xl:px-20 xs:py-4 sm:py-4 md:py-8 lg:py-10 xl:py-10 2xl:p-10">
            {gameState.map((arr, rowIndex) => {
              return arr.map((e, colIndex) => {
                return (
                  <SquareBox
                    socket={socket}
                    gameState={gameState}
                    finishedArray={finishedArray}
                    setGameState={setGameState}
                    currentPlayer={currentPlayer}
                    setCurrentPlayer={setCurrentPlayer}
                    finishedState={finishedState}
                    key={rowIndex * 3 + colIndex}
                    id={rowIndex * 3 + colIndex}
                    playingAs={playingAs}
                    currentElement={e}
                  />
                );
              });
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
