export default class ChessLogic {
  // explain these with chatGPT
  private chessboard: string[][];
  private coordinates: { [key: string]: { color: string; pieceType: string } };

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
  movePiece(source: string, destination: string) {
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

  isValidMove(
    piece: string,
    sourceRow: number,
    sourceCol: number,
    destinationRow: number,
    destinationCol: number
  ) {
    // Check if the destination coordinates are within the chessboard boundaries
    if (
      destinationRow < 0 ||
      destinationRow > 7 ||
      destinationCol < 0 ||
      destinationCol > 7
    ) {
      return false;
    }

    const color = piece[0]; // 'w' for white, 'b' for black
    const pieceType = piece[1]; // 'r' for rook, 'n' for knight, 'b' for bishop, 'q' for queen, 'k' for king, 'p' for pawn

    // Check if the destination square has a piece the same color the moving piece
    if (
      this.chessboard[destinationRow][destinationCol] !== "" &&
      this.chessboard[destinationRow][destinationCol][0] === color
    ) {
      return false;
    }

    // Calculate the absolute differences between the source and destination coordinates
    const rowDiff = Math.abs(destinationRow - sourceRow);
    const colDiff = Math.abs(destinationCol - sourceCol);

    switch (pieceType) {
      case "r":
        if ((rowDiff === 0 && colDiff > 0) || (rowDiff > 0 && colDiff === 0)) {
          // Check if there are any pieces in the rook's path
          const rowDir =
            destinationRow === sourceRow
              ? 0
              : destinationRow > sourceRow
              ? 1
              : -1; // Direction of row movement
          const colDir =
            destinationCol === sourceCol
              ? 0
              : destinationCol > sourceCol
              ? 1
              : -1; // Direction of column movement

          let currentRow = sourceRow + rowDir;
          let currentCol = sourceCol + colDir;

          while (
            currentRow !== destinationRow ||
            currentCol !== destinationCol
          ) {
            const currentPiece = this.chessboard[currentRow][currentCol];

            if (currentPiece !== "") {
              if (currentPiece[0] === color) {
                return false; // There is a piece of the same color in the rook's path, move is invalid
              } else {
                break; // There is a piece of a different color in the rooks's path, capture
              }
            }

            currentRow += rowDir;
            currentCol += colDir;
          }

          return true; // No pieces in the path, the move is valid for a rook
        }
        return false;
      // If the move is neither horizontal nor vertical, it's invalid for a rook

      case "n":
        if (
          (rowDiff === 2 && colDiff === 1) ||
          (rowDiff === 1 && colDiff === 2)
        ) {
          // Check if there are any pieces in the knights path
          const destinationPiece =
            this.chessboard[destinationRow][destinationCol];
          if (destinationPiece === "" || destinationPiece[0] !== piece[0]) {
            return true;
          }
        }
        return false;

      case "b":
        if (rowDiff === 1 && colDiff === 1) {
          const rowDir = destinationRow > sourceRow ? 1 : -1;
          const colDir = destinationCol > sourceCol ? 1 : -1;

          let currentRow = sourceRow + rowDir;
          let currentCol = sourceCol + colDir;

          while (
            currentRow !== destinationRow &&
            currentCol !== destinationCol
          ) {
            const currentPiece = this.chessboard[currentRow][currentCol];

            if (currentPiece !== "") {
              if (currentPiece[0] === color) {
                return false;
              } else {
                break;
              }
            }
            currentRow += rowDir;
            currentCol += colDir;
          }
          return true;
        }
        return false;

      case "q":
        if (
          (rowDiff === 1 && colDiff === 1) ||
          (rowDiff === 1 && colDiff === 0) ||
          (rowDiff === 0 && colDiff === 1)
        ) {
          const rowDir =
            destinationRow === sourceRow
              ? 0
              : destinationRow > sourceRow
              ? 1
              : -1; // Direction of row movement
          const colDir =
            destinationCol === sourceCol
              ? 0
              : destinationCol > sourceCol
              ? 1
              : -1; // Direction of column movement

          let currentRow = sourceRow + rowDir;
          let currentCol = sourceCol + colDir;

          while (
            currentRow !== destinationRow ||
            currentCol !== destinationCol
          ) {
            const currentPiece = this.chessboard[currentRow][currentCol];

            if (currentPiece !== "") {
              if (currentPiece[0] === color) {
                return false;
              } else {
                break;
              }
            }
            currentRow += rowDir;
            currentCol += colDir;
          }
          return true;
        }
        return false;
      case "k":
        if (
          (rowDiff === 1 && colDiff === 1) ||
          (rowDiff === 1 && colDiff === 0) ||
          (rowDiff === 0 && colDiff === 1)
        ) {
          const destinationPiece =
            this.chessboard[destinationRow][destinationCol];
          if (destinationPiece === "" || destinationPiece[0] !== color) {
            return true;
          }
        }
        return false;

      case "p":
        // Determine the direction of movement based on the color of the pawn
        const pawnDirection = color === "w" ? -1 : 1;

        // Pawn's normal move (one square forward)
        if (
          colDiff === 0 &&
          ((rowDiff === 1 &&
            this.chessboard[destinationRow][destinationCol] === "") || // Move one square forward
            (rowDiff === 2 &&
              sourceRow === (color === "w" ? 6 : 1) && // Move two squares forward on the first move
              this.chessboard[destinationRow][destinationCol] === "" &&
              this.chessboard[destinationRow + pawnDirection][
                destinationCol
              ] === ""))
        ) {
          return true;
        }

        // Pawn's capturing move (diagonally)
        if (
          rowDiff === 1 &&
          colDiff === 1 &&
          this.chessboard[destinationRow][destinationCol] !== "" &&
          this.chessboard[destinationRow][destinationCol][0] !== color
        ) {
          return true;
        }

        // En passant
        // const lastMove = this.getLastMove();
        // if (
        //   lastMove &&
        //   lastMove.piece[1] === "p" && // The last moved piece was a pawn
        //   Math.abs(lastMove.destinationRow - lastMove.sourceRow) === 2 && // The pawn moved two squares
        //   destinationCol === lastMove.destinationCol && // The current move is capturing en passant
        //   sourceRow === (color === "w" ? 3 : 4) && // The pawn is at the correct starting row
        //   Math.abs(sourceCol - lastMove.destinationCol) === 1 // The pawn is capturing diagonally
        // ) {
        //   return true;
        // }

        return false;

      default:
        return false;
    }
  }
}
