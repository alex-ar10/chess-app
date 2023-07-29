class ChessLogic {
  constructor() {
    this.chessboard = [
      ["rb", "nb", "bb", "qb", "kb", "bb", "nb", "rb"],
      ["pb", "pb", "pb", "pb", "pb", "pb", "pb", "pb"],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["pw", "pw", "pw", "pw", "pw", "pw", "pw", "pw"],
      ["rw", "nw", "bw", "qw", "kw", "bw", "nw", "rw"],
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
        // if condition is checking whether either the row or the column has to stay the same when the rook is moving
        if ((rowDiff === 0 && colDiff > 0) || (rowDiff > 0 && colDiff === 0)) {
          // Check if there are any pieces in the rook's path
          const rowDir =
            destinationRow === sourceRow
              ? 0
              : destinationRow > sourceRow
              ? 1
              : -1; // Defines the direction of the row movement (1 or -1)
          const colDir =
            destinationCol === sourceCol
              ? 0
              : destinationCol > sourceCol
              ? 1
              : -1; // Defines the direction of the column movement (1 or -1)

          // Add the movement to the currentRow/Col variables
          let currentRow = sourceRow + rowDir;
          let currentCol = sourceCol + colDir;

          // while currentRow/Col are not equal to the destinationRow/Col, the direction gets added to the currentRow/Col
          while (
            currentRow !== destinationRow ||
            currentCol !== destinationCol
          ) {
            const currentPiece = this.chessboard[currentRow][currentCol];

            if (currentPiece !== "") {
              if (currentPiece[0] === color) {
                return false; // There is a piece of the same color in the rook's path, move is invalid
              } else {
                break; // There is a piece of a different color in the rook's path, capture
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
        // if condition is checking whether the movement is always in an L shape (+/- 1 rows & +/- 2 col or +/- 2 rows & +/- 1 col)
        if (
          (rowDiff === 2 && colDiff === 1) ||
          (rowDiff === 1 && colDiff === 2)
        ) {
          // Check if there are any pieces in the knight's path
          const destinationPiece =
            this.chessboard[destinationRow][destinationCol];
          if (destinationPiece === "" || destinationPiece[0] !== piece[0]) {
            return true;
          }
        }
        return false;

      case "b":
        // if condition is checking whether the movement of the bishop is diagonal (+/- row === +/- col)
        if (rowDiff === colDiff) {
          const rowDir = destinationRow > sourceRow ? 1 : -1; // Defines the direction of the row movement (1 or -1)
          const colDir = destinationCol > sourceCol ? 1 : -1; // Defines the direction of the column movement (1 or -1)

          // Add the movement to the currentRow/Col variables
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
        return false;

      default:
        return false;
    }
  }
}

// Step 1: Create an instance of the ChessLogic class
const chessGame = new ChessLogic();

// Step 2: Test the movePiece function with different source and destination coordinates

// Example 1: Valid move (pawn moves one square forward)
console.log("Move 1: ", chessGame.movePiece("e2", "e3")); // Output: true

// Example 2: Invalid move (attempt to move to a square occupied by the same color piece)
console.log("Move 2: ", chessGame.movePiece("e1", "e2")); // Output: false

// Example 3: Invalid move (attempt to move a white pawn two squares forward after its first move)
console.log("Move 3: ", chessGame.movePiece("e3", "e5")); // Output: false

// Example 4: Valid move (knight moves in an L shape)
console.log("Move 4: ", chessGame.movePiece("b1", "c3")); // Output: true

// Example 5: Invalid move (attempt to move a pawn diagonally without capturing)
console.log("Move 5: ", chessGame.movePiece("e5", "d4")); // Output: false

// Example 6: Invalid move (attempt to move a bishop in a non-diagonal direction)
console.log("Move 6: ", chessGame.movePiece("c1", "c3")); // Output: false

// Example 6: Invalid move (attempt to move a bishop in a non-diagonal direction)
console.log("Move 6: ", chessGame.movePiece("g1", "h3")); // Output: false

// ... Add more test cases as needed to check different moves ...

// Step 3: Check the output in the console to see if the moves are valid or not.
