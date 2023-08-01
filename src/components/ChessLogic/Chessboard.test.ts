import Chessboard from './Chessboard';

test('moves the queen diagonally', () => {
  const board = new Chessboard();
  expect(board.movePiece('e1', 'e2')).toBe(true);
});
