import ChessLogic from "./ChessLogic";

// Create a test suite
describe("ChessLogic", () => {
  let chessLogic: ChessLogic;
  beforeEach(() => {
    // Create a new instance of ChessLogic before each test case
    chessLogic = new ChessLogic();
  });

  it("should move a pawn one square forward", () => {
    expect(chessLogic.movePiece("e2", "e3")).toBe(true);
    expect(chessLogic.movePiece("e7", "e6")).toBe(true);
  });

  it("should not move a pawn one square forward if there's a piece in the way, after checking for pawns moving two squares forward", () => {
    expect(chessLogic.movePiece("e2", "e4")).toBe(true);
    expect(chessLogic.movePiece("e7", "e5")).toBe(true);
    expect(chessLogic.movePiece("e4", "e5")).toBe(false); // Invalid move: another pawn is blocking the path
  });

  it("should allow a pawn to capture an opponent's piece diagonally", () => {
    expect(chessLogic.movePiece("e2", "e4")).toBe(true);
    expect(chessLogic.movePiece("d7", "d5")).toBe(true);
    expect(chessLogic.movePiece("e4", "d5")).toBe(true);
  });

  it("should not allow a pawn to capture a piece diagonally if there's no opponent's piece", () => {
    expect(chessLogic.movePiece("e2", "e4")).toBe(true);
    expect(chessLogic.movePiece("d7", "d5")).toBe(true);
    expect(chessLogic.movePiece("e4", "f5")).toBe(false); // Invalid move: no opponent's piece to capture
  });

  it("should move a knight two squares forward and one left", () => {
    expect(chessLogic.movePiece("g1", "h3")).toBe(true);
  });

  it("should not move a knight in an L shape if the destination is blocked by own piece", () => {
    expect(chessLogic.movePiece("g1", "f3")).toBe(true);
    expect(chessLogic.movePiece("g8", "f6")).toBe(true);
    expect(chessLogic.movePiece("f3", "h2")).toBe(false); // Invalid move: destination is blocked by own piece
  });

  it("should move a rook horizontally", () => {
    expect(chessLogic.movePiece("a2", "a4")).toBe(true);
    expect(chessLogic.movePiece("b7", "b5")).toBe(true);
    expect(chessLogic.movePiece("a4", "b5")).toBe(true);
    expect(chessLogic.movePiece("c7", "c5")).toBe(true);
    expect(chessLogic.movePiece("a1", "a4")).toBe(true);
  });

  it("should not move a rook horizontally if there are pieces in the way", () => {
    expect(chessLogic.movePiece("a2", "a4")).toBe(true);
    expect(chessLogic.movePiece("a7", "a5")).toBe(true);
    expect(chessLogic.movePiece("a1", "a5")).toBe(false); // Invalid move: there are pieces in the way
  });

  it("should move a bishop diagonally", () => {
    expect(chessLogic.movePiece("d2", "d3")).toBe(true);
    expect(chessLogic.movePiece("a7", "a5")).toBe(true);
    expect(chessLogic.movePiece("c1", "e3")).toBe(true);
  });

  it("should not move a bishop diagonally if there are pieces in the way", () => {
    expect(chessLogic.movePiece("c2", "c4")).toBe(true);
    expect(chessLogic.movePiece("c7", "c5")).toBe(true);
    expect(chessLogic.movePiece("c1", "g5")).toBe(false); // Invalid move: there are pieces in the way
  });

  it("should move a queen diagonally, vertically and horizontally", () => {
    expect(chessLogic.movePiece("e2", "e4")).toBe(true);
    expect(chessLogic.movePiece("c7", "c5")).toBe(true);
    expect(chessLogic.movePiece("d1", "f3")).toBe(true);
    expect(chessLogic.movePiece("a7", "a5")).toBe(true);
    expect(chessLogic.movePiece("f3", "f5")).toBe(true);
    expect(chessLogic.movePiece("b7", "b5")).toBe(true);
    expect(chessLogic.movePiece("f5", "h5")).toBe(true);
  });

  it("should move a king up one square", () => {
    expect(chessLogic.movePiece("e2", "e4")).toBe(true);
    expect(chessLogic.movePiece("e7", "e5")).toBe(true);
    expect(chessLogic.movePiece("e1", "e2")).toBe(true); // Invalid move: there are pieces in the way
  });

  it("should play the given sequence", () => {
    // 1. d4 d5
    expect(chessLogic.movePiece("d2", "d4")).toBe(true);
    expect(chessLogic.movePiece("d7", "d5")).toBe(true);

    // 2. c4 c6
    expect(chessLogic.movePiece("c2", "c4")).toBe(true);
    expect(chessLogic.movePiece("c7", "c6")).toBe(true);

    // 3. Nc3 Nf6
    expect(chessLogic.movePiece("b1", "c3")).toBe(true);
    expect(chessLogic.movePiece("g8", "f6")).toBe(true);

    // 4. e3 e6
    expect(chessLogic.movePiece("e2", "e3")).toBe(true);
    expect(chessLogic.movePiece("e7", "e6")).toBe(true);

    // 5. Nf3 Nbd7
    expect(chessLogic.movePiece("g1", "f3")).toBe(true);
    expect(chessLogic.movePiece("b8", "d7")).toBe(true);

    // 6. Bd3 dxc4
    expect(chessLogic.movePiece("f1", "d3")).toBe(true);
    expect(chessLogic.movePiece("d5", "c4")).toBe(true);

    // 7. Bxc4 b5
    expect(chessLogic.movePiece("d3", "c4")).toBe(true);
    expect(chessLogic.movePiece("b7", "b5")).toBe(true);

    // 8. Bd3 Bb7
    expect(chessLogic.movePiece("c4", "d3")).toBe(true);
    expect(chessLogic.movePiece("c8", "b7")).toBe(true);

    // // 9. O-O a6
    expect(chessLogic.movePiece("e1", "g1")).toBe(true);
    expect(chessLogic.movePiece("a7", "a6")).toBe(true);

    // // 10. e4 c5
    expect(chessLogic.movePiece("e3", "e4")).toBe(true);
    expect(chessLogic.movePiece("c6", "c5")).toBe(true);

    // // 11. d5 Qc7
    expect(chessLogic.movePiece("d4", "e5")).toBe(true);
    expect(chessLogic.movePiece("d8", "c7")).toBe(true);

    // // 12. dxe6 fxe6
    expect(chessLogic.movePiece("d5", "e6")).toBe(true);
    expect(chessLogic.movePiece("f7", "e6")).toBe(true);

    // // 13. Bc2 c4
    expect(chessLogic.movePiece("d3", "c2")).toBe(true);
    // expect(chessLogic.movePiece("c5", "c4")).toBe(true);

    // // 14. Nd4 Nc5
    // expect(chessLogic.movePiece("b1", "d4")).toBe(true);
    // expect(chessLogic.movePiece("d7", "c5")).toBe(true);

    // // 15. Be3 e5
    // expect(chessLogic.movePiece("f3", "e5")).toBe(true);
    // expect(chessLogic.movePiece("c4", "e5")).toBe(true);

    // // 16. Nf3 Be7
    // expect(chessLogic.movePiece("d4", "f3")).toBe(true);
    // expect(chessLogic.movePiece("f8", "e7")).toBe(true);

    // // 17. Ng5 O-O
    // expect(chessLogic.movePiece("g5", "e7")).toBe(true);
    // expect(chessLogic.movePiece("e8", "g8")).toBe(true);

    // // 18. Bxc5 Bxc5
    // expect(chessLogic.movePiece("c2", "d3")).toBe(true);
    // expect(chessLogic.movePiece("b7", "c5")).toBe(true);

    // // 19. Ne6 Qb6
    // expect(chessLogic.movePiece("g5", "f8")).toBe(true);
    // expect(chessLogic.movePiece("c7", "b6")).toBe(true);

    // // 20. Nxf8 Rxf8
    // expect(chessLogic.movePiece("f8", "f8")).toBe(true);
    // expect(chessLogic.movePiece("f7", "f8")).toBe(true);

    // // 21. Nd5 Bxd5
    // expect(chessLogic.movePiece("d3", "d5")).toBe(true);
    // expect(chessLogic.movePiece("d8", "d5")).toBe(true);

    // // 22. exd5 Bxf2+
    // expect(chessLogic.movePiece("e4", "d5")).toBe(true);
    // expect(chessLogic.movePiece("c5", "f2")).toBe(true);

    // // 23. Kh1 e4
    // expect(chessLogic.movePiece("h1", "h1")).toBe(true);
    // expect(chessLogic.movePiece("e7", "e4")).toBe(true);

    // // 24. Qe2 e3
    // expect(chessLogic.movePiece("e3", "e2")).toBe(true);
    // expect(chessLogic.movePiece("e4", "e3")).toBe(true);

    // // 25. Rfd1 Qd6
    // expect(chessLogic.movePiece("f1", "d1")).toBe(true);
    // expect(chessLogic.movePiece("d5", "d6")).toBe(true);

    // // 26. a4 g6
    // expect(chessLogic.movePiece("a2", "a4")).toBe(true);
    // expect(chessLogic.movePiece("g7", "g6")).toBe(true);

    // // 27. axb5 axb5
    // expect(chessLogic.movePiece("a4", "b5")).toBe(true);
    // expect(chessLogic.movePiece("a6", "b5")).toBe(true);

    // // 28. g3 Nh5
    // expect(chessLogic.movePiece("g2", "g3")).toBe(true);
    // expect(chessLogic.movePiece("h5", "g3")).toBe(true);

    // // 29. Qg4 Bxg3+
    // expect(chessLogic.movePiece("g4", "g3")).toBe(true);
    // expect(chessLogic.movePiece("f2", "g3")).toBe(true);

    // // 30. hxg3 Nxg3+
    // expect(chessLogic.movePiece("h2", "g3")).toBe(true);
    // expect(chessLogic.movePiece("g3", "f5")).toBe(true);

    // // 31. Kg2 Rf2+
    // expect(chessLogic.movePiece("g1", "g2")).toBe(true);
    // expect(chessLogic.movePiece("f5", "f2")).toBe(true);

    // // 32. Kh3 Nf5
    // expect(chessLogic.movePiece("h3", "g3")).toBe(true);
    // expect(chessLogic.movePiece("f2", "g3")).toBe(true);

    // // 33. Rh1 h5
    // expect(chessLogic.movePiece("h1", "h1")).toBe(true);
    // expect(chessLogic.movePiece("h7", "h5")).toBe(true);

    // // 34. Qxg6+ Qxg6
    // expect(chessLogic.movePiece("g2", "g3")).toBe(true);
    // expect(chessLogic.movePiece("g6", "g3")).toBe(true);

    // // 35. Rxg6+ Kf7
    // expect(chessLogic.movePiece("h1", "g1")).toBe(true);
    // expect(chessLogic.movePiece("e8", "f7")).toBe(true);
  });
});
