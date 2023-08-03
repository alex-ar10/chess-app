import ChessPiece from "../../ChessPiece";
import Queen from "../Queen/Queen";

class Pawn extends ChessPiece {
  isValidMove(
    sourceRow: number,
    sourceCol: number,
    destinationRow: number,
    destinationCol: number,
    chessboard: string[][]
  ): boolean {
    // Check if the destination coordinates are within the chessboard boundaries
    if (
      destinationRow < 0 ||
      destinationRow > 7 ||
      destinationCol < 0 ||
      destinationCol > 7
    ) {
      return false;
    }

    const color = chessboard[sourceRow][sourceCol][0];

    // Check if the destination square has a piece of the same color as the moving piece
    if (
      chessboard[destinationRow][destinationCol] !== "" &&
      chessboard[destinationRow][destinationCol][0] === color
    ) {
      return false;
    }

    // Calculate the absolute differences between the source and destination coordinates
    const rowDiff = Math.abs(destinationRow - sourceRow);
    const colDiff = Math.abs(destinationCol - sourceCol);

    // Determine the direction of movement based on the color of the pawn
    const pawnDirection = color === "w" ? -1 : 1;

    // Pawn's normal move (one square forward)
    if (
      colDiff === 0 &&
      ((destinationRow - sourceRow === pawnDirection &&
        chessboard[destinationRow][destinationCol] === "") ||
        (rowDiff === 2 &&
          ((sourceRow === 6 && color === "w") || // Move two squares forward for white from the initial starting position
            (sourceRow === 1 && color === "b")) && // Move two squares forward for black from the initial starting position
          chessboard[destinationRow][destinationCol] === "" &&
          chessboard[sourceRow + pawnDirection][destinationCol] === "")) // Empty destination square and the square in front for two squares forward
    ) {
      return true;
    }

    // Pawn's capturing move (diagonally)
    if (
      rowDiff === 1 &&
      colDiff === 1 &&
      chessboard[destinationRow][destinationCol] !== "" &&
      chessboard[destinationRow][destinationCol][0] !== color
    ) {
      return true;
    }
    return false;
  }
}

export default Pawn;
