import ChessLogic from "./ChessLogic";

// Create a test suite
describe("ChessLogic", () => {
  let chessLogic;
  beforeEach(() => {
    // Create a new instance of ChessLogic before each test case
    chessLogic = new ChessLogic();
  });
  // Test case for a valid move
  it("should move a pawn two squares forward on its first move", () => {
    expect(chessLogic.movePiece("e2", "e4")).toBe(true);
  });
  // Test case for an invalid move
  it("should not allow moving a pawn two squares forward on a non-first move", () => {
    // Move pawn once
    chessLogic.movePiece("e2", "e3");
    // Attempt to move pawn two squares forward (invalid move)
    expect(chessLogic.movePiece("e3", "e5")).toBe(false);
  });
});
