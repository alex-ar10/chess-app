import ChessPiece from "../../ChessPiece";

class Rook extends ChessPiece {
  isValidMove(
    sourceRow: number,
    sourceCol: number,
    destinationRow: number,
    destinationCol: number,
    chessboard: string[][]
  ): boolean {
    // Implement the specific logic for the King's movement here
    return false;
  }
}

export default Rook;
