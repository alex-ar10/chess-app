import ChessPiece from "../../ChessPiece";

class Rook extends ChessPiece {
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

    // Checking if the move is valid for a rook (horizontal or vertical)
    if ((rowDiff === 0 && colDiff > 0) || (rowDiff > 0 && colDiff === 0)) {
      // Direction of movement for rook
      const rowDir =
        destinationRow === sourceRow ? 0 : destinationRow > sourceRow ? 1 : -1;
      const colDir =
        destinationCol === sourceCol ? 0 : destinationCol > sourceCol ? 1 : -1;

      let currentRow = sourceRow + rowDir;
      let currentCol = sourceCol + colDir;

      while (currentRow !== destinationRow || currentCol !== destinationCol) {
        const currentPiece = chessboard[currentRow][currentCol];

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
    } else {
      return false;
    }
  }
}

export default Rook;
