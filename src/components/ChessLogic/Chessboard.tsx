import { cloneDeep } from "lodash";
import { PlayerColor } from "../type";
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
  public turn: PlayerColor;

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

  updatePiecePositions() {
    this.coordinates = {};
    this.initializeCoordinates();
  }

  movePiece(
    source: string,
    destination: string,
    chessboard = this.chessboard,
    pieces = this.pieces,
    checkForCheck = true
  ): boolean {
    const sourcePiece = pieces[source];
    if (!sourcePiece || sourcePiece.color !== this.turn) {
      return false;
    }

    // Convert source and destination from chess notation to coordinates
    const sourceRow = 8 - parseInt(source[1]);
    const sourceCol = source.charCodeAt(0) - 97;
    const destinationRow = 8 - parseInt(destination[1]);
    const destinationCol = destination.charCodeAt(0) - 97;

    if (
      !sourcePiece.isValidMove(
        sourceRow,
        sourceCol,
        destinationRow,
        destinationCol,
        chessboard,
        pieces
      )
    ) {
      return false;
    }

    // Move the piece and update the chessboard and pieces object
    const destinationPiece = chessboard[destinationRow][destinationCol];
    if (checkForCheck && ["bk", "wk"].includes(destinationPiece)) {
      return false;
    }
    if (destinationPiece !== "") {
      delete pieces[destination];
    }
    chessboard[destinationRow][destinationCol] =
      chessboard[sourceRow][sourceCol];
    chessboard[sourceRow][sourceCol] = "";
    sourcePiece.position = destination;
    pieces[destination] = sourcePiece;
    delete pieces[source];

    if (
      sourcePiece.type === "p" &&
      ((sourcePiece.color === "w" && destinationRow === 0) ||
        (sourcePiece.color === "b" && destinationRow === 7))
    ) {
      // Check if the pawn has reached the opponent's end of the board
      // Promote the pawn to a queen
      const promotedQueen = new Queen(sourcePiece.color, "q", destination);
      pieces[destination] = promotedQueen;
      chessboard[destinationRow][destinationCol] = sourcePiece.color + "q";
    }

    this.switchTurn();

    // Check if the king of the next player is in check
    let nextPlayer: PlayerColor = this.turn === "w" ? "b" : "w";
    if (checkForCheck && this.isKingInCheck(nextPlayer)) {
      console.log(`King of player ${this.turn} is in check!`);
      // Handle the check situation as needed
    }

    return true;
  }

  getKingPosition(playerColor: PlayerColor) {
    let kingPosition: string = "";
    for (let position in this.pieces) {
      if (
        this.pieces[position].type === "k" &&
        this.pieces[position].color !== playerColor
      ) {
        kingPosition = position;
        break;
      }
    }
    return kingPosition;
  }

  switchTurn() {
    this.turn = this.turn === "w" ? "b" : "w";
  }

  isKingInCheck(playerColor: PlayerColor): boolean {
    const kingPosition = this.getKingPosition(playerColor);

    // Clone the board and pieces
    const cloneBoard = cloneDeep(this.chessboard);
    const clonePieces = cloneDeep(this.pieces);
    console.log("turn: ", this.turn);
    // Check all of the opponent's pieces to see if they can move to the king's position
    this.switchTurn();

    for (let position in clonePieces) {
      const piece = clonePieces[position];
      if (piece.color === playerColor) {
        // Try to move the piece to the king's position
        console.log({ position, kingPosition, turn: this.turn });

        if (
          this.movePiece(position, kingPosition, cloneBoard, clonePieces, false)
        ) {
          // If the move was valid, the king is in check
          console.log("check");

          return true;
        }
      }
    }

    // If none of the opponent's pieces can move to the king's position, the king is not in check
    return false;
  }

  isCheckmate(playerColor: PlayerColor): boolean {
    // If the king is not in check, it cannot be checkmate
    if (!this.isKingInCheck(playerColor)) {
      return false;
    }

    // Go through all the player's pieces and try every possible move
    for (let position in this.pieces) {
      const piece = this.pieces[position];
      if (piece.color === playerColor) {
        // Go through all potential moves for this piece
        for (let row = 0; row < 8; row++) {
          for (let col = 0; col < 8; col++) {
            const dest = String.fromCharCode(97 + col) + (8 - row);
            const cloneBoard = cloneDeep(this.chessboard);
            const clonePieces = cloneDeep(this.pieces);

            // Try to move the piece
            if (
              this.movePiece(position, dest, cloneBoard, clonePieces, false)
            ) {
              // After making this move, check if the king is still in check
              if (!this.isKingInCheck(playerColor)) {
                // There's a legal move that can get the king out of check
                return false;
              }
            }
          }
        }
      }
    }

    // If we've gone through all pieces and all possible moves, and the king is still in check,
    // it's a checkmate
    return true;
  }

  // Update the getPieceAtPosition method
  getPieceAtPosition(position: string): ChessPiece | undefined {
    return this.pieces[position];
  }
}

export default Chessboard;
