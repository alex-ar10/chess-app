import ChessPiece from "../../ChessPiece";

class Bishop extends ChessPiece {
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

    // if condition is checking whether the movement of the bishop is diagonal (+/- row === +/- col)
    if (rowDiff === colDiff) {
      const rowDir = destinationRow > sourceRow ? 1 : -1; // Defines the direction of the row movement (1 or -1)
      const colDir = destinationCol > sourceCol ? 1 : -1; // Defines the direction of the column movement (1 or -1)

      // Add the movement to the currentRow/Col variables
      let currentRow = sourceRow + rowDir;
      let currentCol = sourceCol + colDir;

      while (currentRow !== destinationRow && currentCol !== destinationCol) {
        const currentPiece = chessboard[currentRow][currentCol];

        if (currentPiece !== "") {
          return false;
        }

        currentRow += rowDir;
        currentCol += colDir;
      }
      return true;
    }
    return false;
  }
}

export default Bishop;
