import ChessPiece from "../../ChessPiece";

class Knight extends ChessPiece {
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

        // if condition is checking whether the movement is always in an L shape (+/- 1 rows & +/- 2 col or +/- 2 rows & +/- 1 col)
        if (
          (rowDiff === 2 && colDiff === 1) ||
          (rowDiff === 1 && colDiff === 2)
        ) {
          const piece = chessboard[sourceRow][sourceCol];
          // Check if there are any pieces in the knights path
          const destinationPiece =
            chessboard[destinationRow][destinationCol];
          if (destinationPiece === "" || destinationPiece[0] !== piece[0]) {
            return true;
          }
        }
        return false;
  }
}

export default Knight;
