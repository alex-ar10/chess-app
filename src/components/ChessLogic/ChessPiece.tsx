class ChessPiece {
  public color: string;
  public type: string;
  public position: string;

  constructor(color: string, type: string, position: string) {
    this.color = color;
    this.type = type;
    this.position = position;
  }

  isValidMove(
    sourceRow: number,
    sourceCol: number,
    destinationRow: number,
    destinationCol: number,
    chessboard: string[][],
    pieces: { [key: string]: ChessPiece }
  ): boolean {
    return false;
  }
}

export default ChessPiece;
