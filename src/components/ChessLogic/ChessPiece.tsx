class ChessPiece {
  constructor(
    public color: string,
    public type: string
  ) {}

  isValidMove(
    sourceRow: number,
    sourceCol: number,
    destinationRow: number,
    destinationCol: number,
    chessboard: string[][]
  ): boolean {
    // Implement the specific logic for each piece's movement here
    return false;
  }
}

export default ChessPiece;
