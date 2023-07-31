import ChessPiece from "./ChessPiece";
import Rook from "./Pieces/Rook/Rook";
import Knight from "./Pieces/Knight/Knight";
import Bishop from "./Pieces/Bishop/Bishop";
import Queen from "./Pieces/Queen/Queen";
import King from "./Pieces/King/King";
import Pawn from "./Pieces/Pawn/Pawn";

class Chessboard {
  public chessboard: string[][];
  public coordinates: { [key: string]: { color: string; pieceType: string } };
  public pieces: { [key: string]: ChessPiece };
  public turn: string;
  public hasMoved: {
    w: { king: boolean; queenSideRook: boolean; kingSideRook: boolean };
    b: { king: boolean; queenSideRook: boolean; kingSideRook: boolean };
  };

  constructor() {
    this.chessboard = [
      ["br", "bn", "bb", "bq", "bk", "bb", "bn", "br"],
      ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"],
      ["wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"],
    ];

    this.pieces = [
      new Rook("w", "r", "a1"),
      new Knight("w", "n", "b1"),
      new Bishop("w", "b", "c1"),
      new Queen("w", "q", "d1"),
      new King("w", "k", "e1"),
      new Bishop("w", "b", "f1"),
      new Knight("w", "n", "g1"),
      new Rook("w", "r", "h1"),
      new Pawn("w", "p", "a2"),
      new Pawn("w", "p", "b2"),
      new Pawn("w", "p", "c2"),
      new Pawn("w", "p", "d2"),
      new Pawn("w", "p", "e2"),
      new Pawn("w", "p", "f2"),
      new Pawn("w", "p", "g2"),
      new Pawn("w", "p", "h2"),
      new Rook("b", "r", "a8"),
      new Knight("b", "n", "b8"),
      new Bishop("b", "b", "c8"),
      new Queen("b", "q", "d8"),
      new King("b", "k", "e8"),
      new Bishop("b", "b", "f8"),
      new Knight("b", "n", "g8"),
      new Rook("b", "r", "h8"),
      new Pawn("b", "p", "a7"),
      new Pawn("b", "p", "b7"),
      new Pawn("b", "p", "c7"),
      new Pawn("b", "p", "d7"),
      new Pawn("b", "p", "e7"),
      new Pawn("b", "p", "f7"),
      new Pawn("b", "p", "g7"),
      new Pawn("b", "p", "h7"),
    ];

    // shows who's turn it is
    this.turn = "w";

    // shows whether kings or rooks have moved for castling move
    this.hasMoved = {
      w: { king: false, queenSideRook: false, kingSideRook: false },
      b: { king: false, queenSideRook: false, kingSideRook: false },
    };

    // initialize Pieces directly in array with "new"
    // reset chessboard durch initializen

    this.coordinates = {};
    this.initializeCoordinates();
  }

  initializeCoordinates() {
    for (let row = 0; row < this.chessboard.length; row++) {
      for (let column = 0; column < this.chessboard.length; column++) {
        const piece = this.chessboard[row][column];
        if (piece !== "") {
          const color = piece[0];
          const pieceType = piece[1];

          const chessNotation = String.fromCharCode(97 + column) + (8 - row);
          this.coordinates[chessNotation] = { color, pieceType };
        }
      }
    }
  }


  movePiece(source: string, destination: string): boolean {
    // Validate the move and update the board state
    const sourcePiece = this.getPieceAtPosition(source);
    if (!sourcePiece || sourcePiece.color !== this.turn) {
      // No piece at the source coordinates or it's not the turn of the player whose piece is being moved
      return false;
    }

    if (!sourcePiece.isValidMove(destination, this.chessboard)) {
      // Invalid move for the piece
      return false;
    }

    // Implement the logic to update the chessboard and coordinates
    // based on the move validated by the piece

    // After updating the board state, switch the turn
    this.turn = this.turn === "w" ? "b" : "w";

    return true;
  }

  getPieceAtPosition(position: string): ChessPiece | undefined {
    // Find the piece at the given position
    return this.pieces.find((piece) => piece.position === position);
  }

}

export default Chessboard;
