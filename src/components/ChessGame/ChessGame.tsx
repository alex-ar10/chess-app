import { PlayerColor } from "../type";
import { useState } from "react";
import Image from "next/image";
import chessboard from "@/assets/chessboard.svg";
import Chessboard from "../ChessLogic/Chessboard";

import BlackRook from "@/assets/chess-pieces/BlackRook.svg";
import BlackKnight from "@/assets/chess-pieces/BlackKnight.svg";
import BlackBishop from "@/assets/chess-pieces/BlackBishop.svg";
import BlackQueen from "@/assets/chess-pieces/BlackQueen.svg";
import BlackKing from "@/assets/chess-pieces/BlackKing.svg";
import BlackPawn from "@/assets/chess-pieces/BlackPawn.svg";
import WhiteRook from "@/assets/chess-pieces/WhiteRook.svg";
import WhiteKnight from "@/assets/chess-pieces/WhiteKnight.svg";
import WhiteBishop from "@/assets/chess-pieces/WhiteBishop.svg";
import WhiteQueen from "@/assets/chess-pieces/WhiteQueen.svg";
import WhiteKing from "@/assets/chess-pieces/WhiteKing.svg";
import WhitePawn from "@/assets/chess-pieces/WhitePawn.svg";

export default function ChessGame() {
  const gridSize = 8;
  const cellSize = 37;

  // Initialize the ChessLogic instance
  const [chessLogic] = useState(new Chessboard());

  // Use state to store the current state of the chessboard
  const [chessboardState, setChessboardState] = useState(chessLogic.chessboard);
  // Initialize the piecePositions state with the initial coordinates from ChessLogic
  const [piecePositions, setPiecePositions] = useState(chessLogic.coordinates);

  const [selectedPiece, setSelectedPiece] = useState<string | null>(null);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handlePieceClick = (id: string) => {
    // Check if the piece belongs to the current player's turn
    const player: PlayerColor = chessLogic.turn;

    const pieceColor = piecePositions[id]?.color;
    if (selectedPiece === null && pieceColor !== player) {
      setErrorMessage("It's not your turn! Please select a valid piece.");
      return;
    }

    // If a piece is already selected
    if (selectedPiece) {
      // Try to move the selected piece to the clicked square
      const isMoveValid = handlePieceMove(selectedPiece, id);

      // If the move was valid, deselect the piece and change the current player's turn
      if (isMoveValid) {
        setSelectedPiece(null);

        // Check if the king of the current player is in check after the move
        let nextPlayer: PlayerColor = chessLogic.turn === "w" ? "b" : "w";
        if (chessLogic.isKingInCheck(nextPlayer)) {
          setErrorMessage(`King of player ${chessLogic.turn} is in check!`);
        } else {
          setErrorMessage(null); // Clear any previous error messages on a successful move
        }
      }
    } else {
      // If no piece is selected, select the clicked piece
      setSelectedPiece(id);
    }
  };

  const handlePieceMove = (source: string, destination: string) => {
    // Call the movePiece method from ChessLogic
    const isMoveValid = chessLogic.movePiece(source, destination);

    // Update the chessboard state if the move is valid
    if (isMoveValid) {
      setChessboardState(chessLogic.chessboard);
      chessLogic.updatePiecePositions();
      setPiecePositions(chessLogic.coordinates);
    } else {
      // Show error message if the move is invalid
      setErrorMessage("Invalid move! Please try again.");
      setSelectedPiece(null);
    }
    return isMoveValid;
  };

  const renderPiece = (color: string, pieceType: string) => {
    switch (pieceType) {
      case "k":
        return color === "w" ? (
          <>
            <Image src={WhiteKing} alt="White King" width={45} height={45} />
          </>
        ) : (
          <Image src={BlackKing} alt="Black King" width={45} height={45} />
        );
      case "q":
        return color === "w" ? (
          <Image src={WhiteQueen} alt="White Queen" width={45} height={45} />
        ) : (
          <Image src={BlackQueen} alt="Black Queen" width={45} height={45} />
        );
      case "r":
        return color === "w" ? (
          <Image src={WhiteRook} alt="White Rook" width={45} height={45} />
        ) : (
          <Image src={BlackRook} alt="Black Rook" width={45} height={45} />
        );
      case "b":
        return color === "w" ? (
          <Image src={WhiteBishop} alt="White Bishop" width={45} height={45} />
        ) : (
          <Image src={BlackBishop} alt="Black Bishop" width={45} height={45} />
        );
      case "n":
        return color === "w" ? (
          <Image src={WhiteKnight} alt="White Knight" width={45} height={45} />
        ) : (
          <Image src={BlackKnight} alt="Black Knight" width={45} height={45} />
        );
      case "p":
        return color === "w" ? (
          <Image src={WhitePawn} alt="White Pawn" width={45} height={45} />
        ) : (
          <Image src={BlackPawn} alt="Black Pawn" width={45} height={45} />
        );
      default:
        return null;
    }
  };

  return (
    <main className="relative">
      <div className="top-7 left-7 absolute">
        {/* Render the chessboard squares */}
        {Array.from({ length: gridSize * gridSize }).map((_, index) => {
          const column = String.fromCharCode(97 + (index % gridSize));
          const row = 8 - Math.floor(index / gridSize);
          const id = `${column}${row}`;

          return (
            <div
              key={index}
              id={id}
              className={`absolute w-37px h-37px ${
                selectedPiece === id ? "bg-slate-400" : ""
              }`}
              style={{
                top: `${Math.floor(index / gridSize) * cellSize}px`,
                left: `${(index % gridSize) * cellSize}px`,
              }}
              onClick={() => {
                handlePieceClick(id);
              }}
            >
              {/* Render the chess pieces */}
              {
                // Conditional rendering based on piece type and color
                renderPiece(
                  piecePositions[id]?.color,
                  piecePositions[id]?.pieceType
                )
              }
            </div>
          );
        })}
      </div>

      <Image
        src={chessboard}
        alt="Chessboard"
        width={351}
        height={351}
        className="pointer-events-none"
      />
      <div className="text-red-500">{errorMessage}</div>
    </main>
  );
}
