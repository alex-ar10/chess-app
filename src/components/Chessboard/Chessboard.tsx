import { useState } from "react";
import Image from "next/image";
import chessboard from "@/assets/chessboard.svg";
import ChessLogic from "../ChessLogic/ChessLogic";
import {
  BlackRook,
  BlackKnight,
  BlackBishop,
  BlackQueen,
  BlackKing,
  BlackPawn,
  WhiteRook,
  WhiteKnight,
  WhiteBishop,
  WhiteQueen,
  WhiteKing,
  WhitePawn,
} from "../PiecesSVG/PiecesSVG";
import { log } from "console";

export default function Chessboard() {
  const gridSize = 8;
  const cellSize = 37;

  // Initialize the ChessLogic instance
  const chessLogic: ChessLogic = new ChessLogic();

  // Use state to store the current state of the chessboard
  const [chessboardState, setChessboardState] = useState(chessLogic.chessboard);

  // Initialize the piecePositions state with the initial coordinates from ChessLogic
  const [piecePositions, setPiecePositions] = useState(chessLogic.coordinates);
  console.log(piecePositions);

  const handlePieceMove = (source: string, destination: string) => {
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
        {/* Render the chessboard squares */}
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
                const source = id;
                const destination = "A1"; // Hardcoding destination for testing purposes
                handlePieceMove(source, destination);
              }}
            >
              {/* Render the chess pieces */}
              {piecePositions[id] &&
                // Render the corresponding SVG component based on piece type and color
                (piecePositions[id].color === "w" ? (
                  <WhiteKing />
                ) : (
                  <BlackPawn />
                ))}
            </div>
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
