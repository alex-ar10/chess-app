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
      ["wp", "wp", "wp", "wp", "", "wp", "wp", "wp"],
      ["wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"],
    ];

    this.pieces = {
      a1: new Rook("w", "r", "a1"),
      b1: new Knight("w", "n", "b1"),
      c1: new Bishop("w", "b", "c1"),
      d1: new Queen("w", "q", "d1"),
      e1: new King("w", "k", "e1"),
      f1: new Bishop("w", "b", "f1"),
      g1: new Knight("w", "n", "g1"),
      h1: new Rook("w", "r", "h1"),
      a2: new Pawn("w", "p", "a2"),
      b2: new Pawn("w", "p", "b2"),
      c2: new Pawn("w", "p", "c2"),
      d2: new Pawn("w", "p", "d2"),
      e2: new Pawn("w", "p", "e2"),
      f2: new Pawn("w", "p", "f2"),
      g2: new Pawn("w", "p", "g2"),
      h2: new Pawn("w", "p", "h2"),
      a8: new Rook("b", "r", "a8"),
      b8: new Knight("b", "n", "b8"),
      c8: new Bishop("b", "b", "c8"),
      d8: new Queen("b", "q", "d8"),
      e8: new King("b", "k", "e8"),
      f8: new Bishop("b", "b", "f8"),
      g8: new Knight("b", "n", "g8"),
      h8: new Rook("b", "r", "h8"),
      a7: new Pawn("b", "p", "a7"),
      b7: new Pawn("b", "p", "b7"),
      c7: new Pawn("b", "p", "c7"),
      d7: new Pawn("b", "p", "d7"),
      e7: new Pawn("b", "p", "e7"),
      f7: new Pawn("b", "p", "f7"),
      g7: new Pawn("b", "p", "g7"),
      h7: new Pawn("b", "p", "h7"),
    };

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
    const sourcePiece = this.pieces[source];
    if (!sourcePiece || sourcePiece.color !== this.turn) {
      return false;
    }
  
    // Convert source and destination from chess notation to coordinates
    const sourceRow = 8 - parseInt(source[1]);
    const sourceCol = source.charCodeAt(0) - 97;
    const destinationRow = 8 - parseInt(destination[1]);
    const destinationCol = destination.charCodeAt(0) - 97;
  
    if (!sourcePiece.isValidMove(sourceRow, sourceCol, destinationRow, destinationCol, this.chessboard, this.hasMoved)) {
      return false;
    }
  
    // Move the piece and update the chessboard and pieces object
    const destinationPiece = this.chessboard[destinationRow][destinationCol];
    if (destinationPiece !== "") {
      delete this.pieces[destination];
    }
    this.chessboard[destinationRow][destinationCol] = this.chessboard[sourceRow][sourceCol];
    this.chessboard[sourceRow][sourceCol] = "";
    sourcePiece.position = destination;
    this.pieces[destination] = sourcePiece;
    delete this.pieces[source];
  
    this.turn = this.turn === "w" ? "b" : "w";
  
    return true;
  }
  
  // Update the getPieceAtPosition method
  getPieceAtPosition(position: string): ChessPiece | undefined {
    return this.pieces[position];
  }

}

export default Chessboard;
