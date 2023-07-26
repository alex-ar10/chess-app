import { useState } from "react";
import Image from "next/image";
import chessboard from "@/assets/chessboard.svg";
import ChessLogic from "../ChessLogic/ChessLogic";

export default function Chessboard() {
  const gridSize = 8;
  const cellSize = 37;

  // Initialize the ChessLogic instance
  const chessLogic = new ChessLogic();

  // Use state to store the current state of the chessboard
  const [chessboardState, setChessboardState] = useState(chessLogic.chessboard);

  const handlePieceMove = (source, destination) => {
    // Call the movePiece method from ChessLogic
    const isMoveValid = chessLogic.movePiece(source, destination);

    // Update the chessboard state if the move is valid
    if (isMoveValid) {
      setChessboardState(chessLogic.chessboard);
    }
  };

  return (
    <main className="relative">
      <div className="top-7 left-7 absolute">
        {Array.from({ length: gridSize * gridSize }).map((_, index) => {
          const column = String.fromCharCode(65 + (index % gridSize));
          const row = 8 - Math.floor(index / gridSize);

          const id = `${column}${row}`;

          return (
            <div
              key={index}
              id={id}
              className="absolute w-37px h-37px border-2 border-black"
              style={{
                top: `${Math.floor(index / gridSize) * cellSize}px`,
                left: `${(index % gridSize) * cellSize}px`,
              }}
              onClick={() => {
                // Handle click events on the chessboard squares
                // Call handlePieceMove with source and destination coordinates
                const source = id; // e.g., "A8", "B6"
                const destination = "A1"; // For testing purposes, you can hardcode the destination or handle it through user input
                handlePieceMove(source, destination);
              }}
            />
          );
        })}
      </div>

      <Image
        src={chessboard}
        alt="Chessboard"
        width={351}
        height={351}
        className="pointer-events-none opacity-20"
      />
    </main>
  );
}
