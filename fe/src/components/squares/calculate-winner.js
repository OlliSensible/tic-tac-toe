export function calculateWinner(squares, size) {
  const winnerCondition = 3;

  // Check by rows
  for (let i = 0; i < size; i++) {
    for (let j = 0; j <= size - winnerCondition; j++) {
      // if there are three identical non-empty symbols in a row
      if (squares[i * size + j] && squares[i * size + j] === squares[i * size + j + 1] && squares[i * size + j] === squares[i * size + j + 2]) {
        return squares[i * size + j]; // Return the winning symbol in the row
      }
    }
  }

  // Check by column
  for (let i = 0; i < size; i++) {
    for (let j = 0; j <= size - winnerCondition; j++) {
      // if there are three identical non-empty symbols in a column
      if (squares[j * size + i] && squares[j * size + i] === squares[(j + 1) * size + i] && squares[j * size + i] === squares[(j + 2) * size + i]) {
        return squares[j * size + i]; // Winner symbol return in the column
      }
    }
  }

  // Check by diagonally from left to right
  for (let i = 0; i <= size - winnerCondition; i++) {
    for (let j = 0; j <= size - winnerCondition; j++) {
      // if there are three identical non-empty symbols in the diagonal from left to right
      if (squares[i * size + j] && squares[i * size + j] === squares[(i + 1) * size + j + 1] && squares[i * size + j] === squares[(i + 2) * size + j + 2]) {
        return squares[i * size + j]; // Winner symbol return in the diagonal from left to right
      }
    }
  }

  // Check by diagonally from right to left
  for (let i = 0; i <= size - winnerCondition; i++) {
    for (let j = size - 1; j >= winnerCondition - 1; j--) {
      // if there are three identical non-empty symbols in the diagonal from right to left
      if (squares[i * size + j] && squares[i * size + j] === squares[(i + 1) * size + j - 1] && squares[i * size + j] === squares[(i + 2) * size + j - 2]) {
        return squares[i * size + j]; // Winner symbol return  in the diagonal from right to left
      }
    }
  }

  return null; 
}