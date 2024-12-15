export const checkWinner = (boardState: (string | null)[]) => {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      boardState[a] && 
      boardState[a] === boardState[b] && 
      boardState[a] === boardState[c]
    ) {
      return boardState[a];
    }
  }

  return boardState.every(cell => cell) ? 'draw' : null;
};