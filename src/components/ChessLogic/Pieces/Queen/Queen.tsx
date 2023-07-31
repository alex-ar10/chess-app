import Chessboard from "../../Chessboard";
import ChessPiece from "../../ChessPiece";

class Queen extends ChessPiece {
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
  
      const color = piece[0]; // 'w' for white, 'b' for black
      const pieceType = piece[1]; // 'r' for rook, 'n' for knight, 'b' for bishop, 'q' for queen, 'k' for king, 'p' for pawn
  
      // Check if the destination square has a piece the same color the moving piece
      if (
        this.chessboard[destinationRow][destinationCol] !== "" &&
        this.chessboard[destinationRow][destinationCol][0] === color
      ) {
        return false;
      }
  
      // Calculate the absolute differences between the source and destination coordinates
      const rowDiff = Math.abs(destinationRow - sourceRow);
      const colDiff = Math.abs(destinationCol - sourceCol);

    if (
      (rowDiff >= 1 && colDiff >= 1) ||
      (rowDiff >= 1 && colDiff === 0) ||
      (rowDiff === 0 && colDiff >= 1)
    ) {
      const rowDir =
        destinationRow === sourceRow
          ? 0
          : destinationRow > sourceRow
          ? 1
          : -1; // Direction of row movement
      const colDir =
        destinationCol === sourceCol
          ? 0
          : destinationCol > sourceCol
          ? 1
          : -1; // Direction of column movement

      let currentRow = sourceRow + rowDir;
      let currentCol = sourceCol + colDir;

      while (
        currentRow !== destinationRow ||
        currentCol !== destinationCol
      ) {
        const currentPiece = this.chessboard[currentRow][currentCol];

        if (currentPiece !== "") {
          if (currentPiece[0] === color) {
            return false;
          } else {
            break;
          }
        }
        currentRow += rowDir;
        currentCol += colDir;
      }
      return true;
    }
    return false;
  }
}

export default Queen;
