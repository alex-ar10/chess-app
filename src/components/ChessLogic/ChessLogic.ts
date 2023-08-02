// // import Chessboard from "./Chessboard";
// // import ChessPiece from "./ChessPiece";
// // import Rook from "./Pieces/Rook/Rook";
// // import Knight from "./Pieces/Knight/Knight";
// // import Bishop from "./Pieces/Bishop/Bishop";
// // import Queen from "./Pieces/Queen/Queen";
// // import King from "./Pieces/King/King";
// // import Pawn from "./Pieces/Pawn/Pawn";

// class ChessLogic {
//   // public chessboard: Chessboard;
//   // public pieces: { [key: string]: ChessPiece };
//   // public turn: string;
//   // public hasMoved: {
//   //   w: { king: boolean; queenSideRook: boolean; kingSideRook: boolean };
//   //   b: { king: boolean; queenSideRook: boolean; kingSideRook: boolean };
//   // };

//   // constructor() {
//   //   this.chessboard = new Chessboard();

//   //   this.pieces = {
//   //     wr: new Rook("w", "r"),
//   //     wn: new Knight("w", "n"),
//   //     wb: new Bishop("w", "b"),
//   //     wq: new Queen("w", "q"),
//   //     wk: new King("w", "k"),
//   //     wp: new Pawn("w", "p"),
//   //     br: new Rook("b", "r"),
//   //     bn: new Knight("b", "n"),
//   //     bb: new Bishop("b", "b"),
//   //     bq: new Queen("b", "q"),
//   //     bk: new King("b", "k"),
//   //     bp: new Pawn("b", "p"),
//   //   };

//   //   // shows who's turn it is
//   //   this.turn = "w";

//   //   // shows whether kings or rooks have moved for castling move
//   //   this.hasMoved = {
//   //     w: { king: false, queenSideRook: false, kingSideRook: false },
//   //     b: { king: false, queenSideRook: false, kingSideRook: false },
//   //   };
//   // }

//   movePiece(source: string, destination: string) {
//     const sourceCol = source.charCodeAt(0) - 97; // Convert chess notation to column index
//     const sourceRow = 8 - parseInt(source[1], 10); // Convert chess notation to row index
//     const destinationCol = destination.charCodeAt(0) - 97; // Convert chess notation to column index
//     const destinationRow = 8 - parseInt(destination[1], 10); // Convert chess notation to row index

//     const piece = this.chessboard[sourceRow][sourceCol];

//     if (!piece || piece === "") {
//       // No piece at the source coordinates
//       return false;
//     }

//     // Check that it's the turn of the player whose piece is being moved
//     if (piece[0] !== this.turn) {
//       return false;
//     }

//     // Validate the move based on your chess rules (e.g., check for valid piece movement)
//     if (
//       !this.isValidMove(
//         piece,
//         sourceRow,
//         sourceCol,
//         destinationRow,
//         destinationCol
//       )
//     ) {
//       return false;
//     }
//     // Perform the move
//     this.chessboard[destinationRow][destinationCol] = piece;
//     this.chessboard[sourceRow][sourceCol] = "";

//     // Update the coordinates object with the new position
//     const color = piece[0];
//     const pieceType = piece[1];
//     this.coordinates[destination] = { color, pieceType };
//     delete this.coordinates[source];

//     this.turn = this.turn === "w" ? "b" : "w";

//     return true;
//   }
// }

// export default ChessLogic;
