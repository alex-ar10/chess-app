import Chessboard from "./Chessboard";

describe("Chessboard", () => {
  let chessboard: Chessboard;
  beforeEach(() => {
    // Create a new instance of ChessLogic before each test case
    chessboard = new Chessboard();
  });

  it("should move a pawn one square forward", () => {
    expect(chessboard.movePiece("e2", "e3")).toBe(true);
    expect(chessboard.movePiece("e7", "e6")).toBe(true);
  });

  it("should not move a pawn one square forward if there's a piece in the way, after checking for pawns moving two squares forward", () => {
    expect(chessboard.movePiece("e2", "e4")).toBe(true);
    expect(chessboard.movePiece("e7", "e5")).toBe(true);
    expect(chessboard.movePiece("e4", "e5")).toBe(false); // Invalid move: another pawn is blocking the path
  });

  it("should allow a pawn to capture an opponent's piece diagonally", () => {
    expect(chessboard.movePiece("e2", "e4")).toBe(true);
    expect(chessboard.movePiece("d7", "d5")).toBe(true);
    expect(chessboard.movePiece("e4", "d5")).toBe(true);
  });

  it("should not allow a pawn to capture a piece diagonally if there's no opponent's piece", () => {
    expect(chessboard.movePiece("e2", "e4")).toBe(true);
    expect(chessboard.movePiece("d7", "d5")).toBe(true);
    expect(chessboard.movePiece("e4", "f5")).toBe(false); // Invalid move: no opponent's piece to capture
  });

  it("should move a knight two squares forward and one left", () => {
    expect(chessboard.movePiece("g1", "h3")).toBe(true);
  });

  it("should not move a knight in an L shape if the destination is blocked by own piece", () => {
    expect(chessboard.movePiece("g1", "f3")).toBe(true);
    expect(chessboard.movePiece("g8", "f6")).toBe(true);
    expect(chessboard.movePiece("f3", "h2")).toBe(false); // Invalid move: destination is blocked by own piece
  });

  it("should move a rook horizontally", () => {
    expect(chessboard.movePiece("a2", "a4")).toBe(true);
    expect(chessboard.movePiece("b7", "b5")).toBe(true);
    expect(chessboard.movePiece("a4", "b5")).toBe(true);
    expect(chessboard.movePiece("c7", "c5")).toBe(true);
    expect(chessboard.movePiece("a1", "a4")).toBe(true);
  });

  it("should not move a rook horizontally if there are pieces in the way", () => {
    expect(chessboard.movePiece("a2", "a4")).toBe(true);
    expect(chessboard.movePiece("a7", "a5")).toBe(true);
    expect(chessboard.movePiece("a1", "a5")).toBe(false); // Invalid move: there are pieces in the way
  });

  it("should move a bishop diagonally", () => {
    expect(chessboard.movePiece("d2", "d3")).toBe(true);
    expect(chessboard.movePiece("a7", "a5")).toBe(true);
    expect(chessboard.movePiece("c1", "e3")).toBe(true);
  });

  it("should not move a bishop diagonally if there are pieces in the way", () => {
    expect(chessboard.movePiece("c2", "c4")).toBe(true);
    expect(chessboard.movePiece("c7", "c5")).toBe(true);
    expect(chessboard.movePiece("c1", "g5")).toBe(false); // Invalid move: there are pieces in the way
  });

  it("should move a queen diagonally, vertically and horizontally", () => {
    expect(chessboard.movePiece("e2", "e4")).toBe(true);
    expect(chessboard.movePiece("c7", "c5")).toBe(true);
    expect(chessboard.movePiece("d1", "f3")).toBe(true);
    expect(chessboard.movePiece("a7", "a5")).toBe(true);
    expect(chessboard.movePiece("f3", "f5")).toBe(true);
    expect(chessboard.movePiece("b7", "b5")).toBe(true);
    expect(chessboard.movePiece("f5", "h5")).toBe(true);
  });

  it("should move a king up one square", () => {
    expect(chessboard.movePiece("e2", "e4")).toBe(true);
    expect(chessboard.movePiece("e7", "e5")).toBe(true);
    expect(chessboard.movePiece("e1", "e2")).toBe(true); // Invalid move: there are pieces in the way
  });

  it("should play the given sequence", () => {
    // 1. d4 d5
    expect(chessboard.movePiece("d2", "d4")).toBe(true);
    expect(chessboard.movePiece("d7", "d5")).toBe(true);

    // 2. c4 c6
    expect(chessboard.movePiece("c2", "c4")).toBe(true);
    expect(chessboard.movePiece("c7", "c6")).toBe(true);

    // 3. Nc3 Nf6
    expect(chessboard.movePiece("b1", "c3")).toBe(true);
    expect(chessboard.movePiece("g8", "f6")).toBe(true);

    // 4. e3 e6
    expect(chessboard.movePiece("e2", "e3")).toBe(true);
    expect(chessboard.movePiece("e7", "e6")).toBe(true);

    // 5. Nf3 Nbd7
    expect(chessboard.movePiece("g1", "f3")).toBe(true);
    expect(chessboard.movePiece("b8", "d7")).toBe(true);

    // 6. Bd3 dxc4
    expect(chessboard.movePiece("f1", "d3")).toBe(true);
    expect(chessboard.movePiece("d5", "c4")).toBe(true);

    // 7. Bxc4 b5
    expect(chessboard.movePiece("d3", "c4")).toBe(true);
    expect(chessboard.movePiece("b7", "b5")).toBe(true);

    // 8. Bd3 Bb7
    expect(chessboard.movePiece("c4", "d3")).toBe(true);
    expect(chessboard.movePiece("c8", "b7")).toBe(true);

    // // 9. O-O a6
    expect(chessboard.movePiece("e1", "g1")).toBe(true);
    expect(chessboard.movePiece("a7", "a6")).toBe(true);

    // // 10. e4 c5
    expect(chessboard.movePiece("e3", "e4")).toBe(true);
    expect(chessboard.movePiece("c6", "c5")).toBe(true);

    // // 11. d5 Qc7
    expect(chessboard.movePiece("d4", "d5")).toBe(true);
    expect(chessboard.movePiece("d8", "c7")).toBe(true);

    // // 12. dxe6 fxe6
    expect(chessboard.movePiece("d5", "e6")).toBe(true);
    expect(chessboard.movePiece("f7", "e6")).toBe(true);

    // // 13. Bc2 c4
    expect(chessboard.movePiece("d3", "c2")).toBe(true);
    expect(chessboard.movePiece("c5", "c4")).toBe(true);

    // // 14. Nd4 Nc5
    expect(chessboard.movePiece("f3", "d4")).toBe(true);
    expect(chessboard.movePiece("d7", "c5")).toBe(true);

    // // 15. Be3 e5
    expect(chessboard.movePiece("c1", "e3")).toBe(true);
    expect(chessboard.movePiece("e6", "e5")).toBe(true);

    // // 16. Nf3 Be7
    expect(chessboard.movePiece("d4", "f3")).toBe(true);
    expect(chessboard.movePiece("f8", "e7")).toBe(true);

    // // 17. Ng5 O-O
    expect(chessboard.movePiece("f3", "g5")).toBe(true);
    expect(chessboard.movePiece("e8", "g8")).toBe(true);

    // // 18. Bxc5 Bxc5
    expect(chessboard.movePiece("e3", "c5")).toBe(true);
    expect(chessboard.movePiece("e7", "c5")).toBe(true);

    // // 19. Ne6 Qb6
    expect(chessboard.movePiece("g5", "e6")).toBe(true);
    expect(chessboard.movePiece("c7", "b6")).toBe(true);

    // // 20. Nxf8 Rxf8
    expect(chessboard.movePiece("e6", "f8")).toBe(true);
    expect(chessboard.movePiece("a8", "f8")).toBe(true);

    // // 21. Nd5 Bxd5
    expect(chessboard.movePiece("c3", "d5")).toBe(true);
    expect(chessboard.movePiece("b7", "d5")).toBe(true);

    // // 22. exd5 Bxf2+
    expect(chessboard.movePiece("e4", "d5")).toBe(true);
    expect(chessboard.movePiece("c5", "f2")).toBe(true);

    // // 23. Kh1 e4
    expect(chessboard.movePiece("g1", "h1")).toBe(true);
    expect(chessboard.movePiece("e5", "e4")).toBe(true);

    // // 24. Qe2 e3
    expect(chessboard.movePiece("d1", "e2")).toBe(true);
    expect(chessboard.movePiece("e4", "e3")).toBe(true);
    console.log(chessboard.pieces);
    // // 25. Rfd1 Qd6
    expect(chessboard.movePiece("f1", "d1")).toBe(true);
    expect(chessboard.movePiece("b6", "d6")).toBe(true);

    // // 26. a4 g6
    expect(chessboard.movePiece("a2", "a4")).toBe(true);
    expect(chessboard.movePiece("g7", "g6")).toBe(true);

    // // 27. axb5 axb5
    expect(chessboard.movePiece("a4", "b5")).toBe(true);
    expect(chessboard.movePiece("a6", "b5")).toBe(true);

    // // 28. g3 Nh5
    expect(chessboard.movePiece("g2", "g3")).toBe(true);
    expect(chessboard.movePiece("f6", "h5")).toBe(true);

    // // 29. Qg4 Bxg3+
    expect(chessboard.movePiece("e2", "g4")).toBe(true);
    expect(chessboard.movePiece("f2", "g3")).toBe(true);

    // // 30. hxg3 Nxg3+
    expect(chessboard.movePiece("h2", "g3")).toBe(true);
    expect(chessboard.movePiece("h5", "g3")).toBe(true);

    // // 31. Kg2 Rf2+
    expect(chessboard.movePiece("h1", "g2")).toBe(true);
    expect(chessboard.movePiece("f8", "f2")).toBe(true);

    // // 32. Kh3 Nf5
    expect(chessboard.movePiece("g2", "h3")).toBe(true);
    expect(chessboard.movePiece("g3", "f5")).toBe(true);

    // // 33. Rh1 h5
    expect(chessboard.movePiece("d1", "h1")).toBe(true);
    expect(chessboard.movePiece("h7", "h5")).toBe(true);

    // // 34. Qxg6+ Qxg6
    expect(chessboard.movePiece("g4", "g6")).toBe(true);
    expect(chessboard.movePiece("d6", "g6")).toBe(true);

    // // 35. Rxg6+ Kf7
    expect(chessboard.movePiece("h1", "g1")).toBe(true);
    expect(chessboard.movePiece("g6", "g1")).toBe(true);

    // // 35. xg1+ Kf7
    expect(chessboard.movePiece("a1", "g1")).toBe(true);
    expect(chessboard.movePiece("g8", "f7")).toBe(true);
  });
});
