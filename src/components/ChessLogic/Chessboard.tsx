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
  public whoIsInCheck: PlayerColor | null = null;

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
    checkForCheck = true,
    makeMove = false
  ): boolean {
    const sourcePiece = pieces[source];
    if (!sourcePiece) return false;

    if (!makeMove && sourcePiece.color !== this.turn) {
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

    if (checkForCheck) {
      this.isKingInCheck();
      if (this.whoIsInCheck) {
        // If opponent is in check, see if it's checkmate
        if (this.isCheckmate()) {
          console.log(`${this.whoIsInCheck} is in checkmate!`);
        } else {
          console.log(`${this.whoIsInCheck} is in check, but not checkmate.`);
        }
      }
    }
    if (!makeMove) {
      this.switchTurn();
    }
    return true;
  }

  getKingPosition(
    playerColor: PlayerColor,
    chessboard = this.chessboard,
    pieces = this.pieces
  ): string {
    let kingPosition: string = "";
    for (let position in pieces) {
      if (
        pieces[position].type === "k" &&
        pieces[position].color === playerColor
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

  isKingInCheck(chessboard = this.chessboard, pieces = this.pieces) {
    const originalTurn = this.turn;

    console.log("Checking if a king is in check...");

    // Loop through all the positions
    for (let position in pieces) {
      const piece = pieces[position];

      // Clone the chessboard and pieces for each iteration
      const clonedChessboardCheck = cloneDeep(chessboard);
      const clonedPiecesCheck = cloneDeep(pieces);
      // Get the position of both kings
      const whiteKingPosition = this.getKingPosition(
        "w",
        clonedChessboardCheck,
        clonedPiecesCheck
      );
      const blackKingPosition = this.getKingPosition(
        "b",
        clonedChessboardCheck,
        clonedPiecesCheck
      );

      console.log(`Checking piece at position ${position}...`);

      if (piece.color === "w") {
        // Try to move the white piece to the black king's position
        console.log(
          `Trying to move white piece from ${position} to ${blackKingPosition}...`,
          clonedChessboardCheck
        );
        if (
          this.movePiece(
            position,
            blackKingPosition,
            clonedChessboardCheck,
            clonedPiecesCheck,
            false,
            false
          )
        ) {
          console.log("Black king is in check!");
          this.whoIsInCheck = "b"; // Black king is in check
          this.turn = originalTurn;
          return true;
        }
      } else {
        // Try to move the black piece to the white king's position
        console.log(
          `Trying to move black piece from ${position} to ${whiteKingPosition}...`,
          clonedChessboardCheck
        );
        if (
          this.movePiece(
            position,
            whiteKingPosition,
            clonedChessboardCheck,
            clonedPiecesCheck,
            false
          )
        ) {
          console.log("White king is in check!");
          this.whoIsInCheck = "w"; // White king is in check
          this.turn = originalTurn;
          return true;
        }
      }
    }

    // Reset the flag if no king is in check
    console.log("No king is in check.");
    this.whoIsInCheck = null;

    return false;
  }

  isCheckmate(): boolean {
    const originalTurn = this.turn;

    if (!this.whoIsInCheck) {
      console.log("No player is in check. Exiting isCheckmate early.");
      return false;
    }

    console.log(
      `${this.whoIsInCheck} king is in check. Checking for checkmate...`
    );

    // Initial clones
    const baseChessboard = cloneDeep(this.chessboard);
    const basePieces = cloneDeep(this.pieces);

    // Go through all the player's pieces
    for (let position in basePieces) {
      const piece = basePieces[position];

      if (piece.color !== this.whoIsInCheck) {
        console.log(
          `Skipping ${piece.color} piece at position ${position} because it's not the player's turn.`
        );
        continue;
      }

      console.log(
        `Evaluating moves for ${piece.color} piece at position ${position}`
      );

      // Try moving this piece to every location on the chessboard
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          const potentialDestination =
            String.fromCharCode(97 + col) + (8 - row);

          // Reset the cloned board and pieces to base state for every move
          const clonedChessboardCheckmate = cloneDeep(baseChessboard);
          const clonedPiecesCheckmate = cloneDeep(basePieces);

          if (
            this.movePiece(
              position,
              potentialDestination,
              clonedChessboardCheckmate,
              clonedPiecesCheckmate,
              false,
              true
            )
          ) {
            console.log(
              `Successfully moved piece from ${position} to ${potentialDestination}. Checking if this resolves the check...`
            );

            // If this move resolves the check, it's not checkmate
            if (
              !this.isKingInCheck(
                clonedChessboardCheckmate,
                clonedPiecesCheckmate
              )
            ) {
              this.turn = originalTurn;
              console.log(
                `Moving piece from ${position} to ${potentialDestination} resolves the check. It's not checkmate.`
              );
              return false;
            } else {
              console.log(
                `Moving piece from ${position} to ${potentialDestination} does NOT resolve the check.`
              );
            }
          } else {
            console.log(
              `Invalid move from ${position} to ${potentialDestination}.`
            );
          }
        }
      }
    }
    this.turn = originalTurn;

    console.log("No moves resolve the check. It's checkmate!");
    return true;
  }

  // isCheckmate(playerColor: PlayerColor): boolean {
  //   // If the king is not in check, it cannot be checkmate
  // if (!this.whoIsInCheck) return false;

  //   // Go through all the player's pieces and try every possible move
  //   for (let position in this.pieces) {
  //     const piece = this.pieces[position];
  //     if (piece.color === playerColor) {
  //       // Go through all potential moves for this piece
  //       for (let row = 0; row < 8; row++) {
  //         for (let col = 0; col < 8; col++) {
  //           const dest = String.fromCharCode(97 + col) + (8 - row);
  //           const cloneBoard = cloneDeep(this.chessboard);
  //           const clonePieces = cloneDeep(this.pieces);

  //           // Try to move the piece
  //           if (
  //             this.movePiece(position, dest, cloneBoard, clonePieces, false)
  //           ) {
  //             // After making this move, check if the king is still in check
  //             if (!this.isKingInCheck(playerColor)) {
  //               // There's a legal move that can get the king out of check
  //               return false;
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }

  //   // If we've gone through all pieces and all possible moves, and the king is still in check,
  //   // it's a checkmate
  //   return true;
  // }

  // Update the getPieceAtPosition method
  getPieceAtPosition(position: string): ChessPiece | undefined {
    return this.pieces[position];
  }
}

export default Chessboard;

// isKingInCheck needs cloned chessboard from isCheckmate
