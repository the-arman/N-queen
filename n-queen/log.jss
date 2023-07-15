function solve() {
    // Get the value of the input field
    const n = parseInt(document.getElementById('queens').value);

     // Set the value of the --n CSS variable
  document.querySelector('.chessboard').style.setProperty('--n', n);
  
    // Generate the chessboard squares
    const chessboard = document.querySelector('.chessboard');
    chessboard.innerHTML = '';
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        const square = document.createElement('span');
        square.classList.add('square');
        if ((i + j) % 2 == 0) {
          square.style.backgroundColor = '#eee';
        } else {
          square.style.backgroundColor = '#333';
        }
        chessboard.appendChild(square);
      }
    }
  
    // Solve the n queens problem
    const queens = [];
    solveNQueens(n, queens, 0);
  
    function solveNQueens(n, queens, row) {
      if (row == n) {
        // We found a solution, so display it on the chessboard
        displayQueens(queens);
        return;
      }
      for (let col = 0; col < n; col++) {
        if (isValid(queens, row, col)) {
          queens.push(col);
          solveNQueens(n, queens, row + 1);
          queens.pop();
        }
      }
    }
  
    function isValid(queens, row, col) {
      for (let i = 0; i < row; i++) {
        const queenCol = queens[i];
        if (queenCol == col) {
          return false;
        }
        if (queenCol + i == col + row) {
          return false;
        }
        if (queenCol - i == col - row) {
          return false;
        }
      }
      return true;
    }
  
    function displayQueens(queens) {
      // Remove any existing queens from the chessboard
      const squares = document.querySelectorAll('.square');
      squares.forEach((square) => (square.innerHTML = ''));
  
      // Add the queens to the chessboard
      queens.forEach((queenRow, queenCol) => {
        const squareIndex = queenRow * n + queenCol;
        const square = squares[squareIndex];
        const queenImage = document.createElement('img');
        queenImage.src = 'queen.png';
        queenImage.alt = 'queen';
        queenImage.classList.add('queen');
        square.appendChild(queenImage);
      });
    }
}