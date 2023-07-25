export default class ChessLogic {
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
  movePiece(source, destination) {
    const sourceRow = 8 - parseInt(source[1], 10); // Convert chess notation to row index
    const sourceCol = source.charCodeAt(0) - 97; // Convert chess notation to column index
    const destinationRow = 8 - parseInt(destination[1], 10); // Convert chess notation to row index
    const destinationCol = destination.charCodeAt(0) - 97; // Convert chess notation to column index

    const piece = this.chessboard[sourceRow][sourceCol];

    if (!piece || piece === "") {
      // No piece at the source coordinates
      return false;
    }

    // Validate the move based on your chess rules (e.g., check for valid piece movement)
    if (
      !this.isValidMove(
        piece,
        sourceRow,
        sourceCol,
        destinationRow,
        destinationCol
      )
    ) {
      return false;
    }

    // Perform the move
    this.chessboard[destinationRow][destinationCol] = piece;
    this.chessboard[sourceRow][sourceCol] = "";

    // Update the coordinates object with the new position
    const color = piece[0];
    const pieceType = piece[1];
    this.coordinates[destination] = { color, pieceType };
    delete this.coordinates[source];

    return true;
  }

  isValidMove(piece, sourceRow, sourceCol, destinationRow, destinationCol) {
    // Implement your logic here to check if the move is valid
    // This will depend on the rules of chess and the type of piece being moved
    // You may need to consider factors like piece type, capturing, blocking, etc.
    // Return true if the move is valid, false otherwise.
    // For simplicity, let's assume all moves are valid for now.
    return true;
  }
}
