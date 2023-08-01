import ChessPiece from "../../ChessPiece";

class King extends ChessPiece {
  isValidMove(
    sourceRow: number,
    sourceCol: number,
    destinationRow: number,
    destinationCol: number,
    chessboard: string[][],
    hasMoved: {
      w: { king: boolean; queenSideRook: boolean; kingSideRook: boolean };
      b: { king: boolean; queenSideRook: boolean; kingSideRook: boolean };
    }
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

    if (
      (rowDiff === 1 && colDiff === 1) ||
      (rowDiff === 1 && colDiff === 0) ||
      (rowDiff === 0 && colDiff === 1)
    ) {
      const destinationPiece = chessboard[destinationRow][destinationCol];
      if (destinationPiece === "" || destinationPiece[0] !== color) {
        hasMoved[color as "w" | "b"].king = true; // The king has moved
        return true;
      }
    } else if (
      rowDiff === 0 &&
      colDiff === 2 &&
      !hasMoved[color as "w" | "b"].king && // King has not moved yet
      chessboard[sourceRow][sourceCol + 3] !== "" &&
      chessboard[sourceRow][sourceCol + 3][1] === "r" &&
      !hasMoved[color as "w" | "b"].kingSideRook && // King-side rook has not moved yet
      chessboard[sourceRow][sourceCol + 1] === "" &&
      chessboard[sourceRow][sourceCol + 2] === "" // Squares between king and rook are empty
      // Also, make sure king is not in check or passing through check
    ) {
      hasMoved[color as "w" | "b"].king = true; // The king has moved
      hasMoved[color as "w" | "b"].kingSideRook = true; // The rook has moved
      // The rook moves to the square the king skipped over
      chessboard[sourceRow][sourceCol + 1] =
        chessboard[sourceRow][sourceCol + 3];
      chessboard[sourceRow][sourceCol + 3] = "";
      return true;
    } else if (
      rowDiff === 0 &&
      colDiff === 2 &&
      !hasMoved[color as "w" | "b"].king && // King has not moved yet
      chessboard[sourceRow][sourceCol - 4] !== "" &&
      chessboard[sourceRow][sourceCol - 4][1] === "r" &&
      !hasMoved[color as "w" | "b"].queenSideRook && // Queen-side rook has not moved yet
      chessboard[sourceRow][sourceCol - 1] === "" &&
      chessboard[sourceRow][sourceCol - 2] === "" &&
      chessboard[sourceRow][sourceCol - 3] === "" // Squares between king and rook are empty
      // Also, make sure king is not in check or passing through check
    ) {
      hasMoved[color as "w" | "b"].king = true; // The king has moved
      hasMoved[color as "w" | "b"].queenSideRook = true; // The rook has moved
      // The rook moves to the square the king skipped over
      chessboard[sourceRow][sourceCol - 1] =
        chessboard[sourceRow][sourceCol - 4];
      chessboard[sourceRow][sourceCol - 4] = "";
      return true;
    }
    return false;
  }
}
export default King;