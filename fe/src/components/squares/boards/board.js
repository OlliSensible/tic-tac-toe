import React from 'react';
import Square from '../square';
import { calculateWinner } from '../calculate-winner';
import { Player } from '../../../constants/Player';

function Board({ xIsNext, squares, onPlay, restartGame, toggleHistoryVisibility, playerXWins, playerOWins, totalGames, size }) {
  
  let statusTies = totalGames - playerXWins - playerOWins;

  function handleClick(i) {
    const winner = calculateWinner(squares, size); 
    if (winner || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';    
    onPlay(nextSquares);
  }
  
  function renderSquare(i) {
    return (
      <Square 
        key={i} 
        value={squares[i]} 
        onSquareClick={() => handleClick(i)} 
      />
    );
  }

function renderBoard(size) {
    const board = [];
    for (let row = 0; row < size; row++) {
      const rowSquares = [];
      for (let col = 0; col < size; col++) {
        const squareIndex = row * size + col;
        rowSquares.push(renderSquare(squareIndex)); 
      }
      board.push(<div className="board-row" key={row}>{rowSquares}</div>);
    }
    return board;
  }
  

  const winner = calculateWinner(squares, size);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'TURN: ' + (xIsNext ? 'X' : 'O');
  }

  let upperStatus_;
    if (winner) {
      upperStatus_ = winner;
    } else {
      upperStatus_ = xIsNext ? Player.X : Player.O;
    }

  return (
    <div>
      <ul className="menu">
        <li className={xIsNext ? 'player_X' : 'player_O'}>
          {upperStatus_}
      </li>
      <li className="item">
          <button className="status">
            {status}
          </button>
        </li>
      <li className="item">
        <div className="historyButton">
          <button onClick={toggleHistoryVisibility} 
          className="refresh">
            &#10536;
          </button>
        </div>
      </li>
      <li className="item">
        <div className="restartGame">
          <button onClick={restartGame} 
          className="refresh">
            &#8635;
          </button>
        </div>
      </li>
    </ul>
      {renderBoard(size)}
      <ul className="lover_menu">
        <div className="additional-buttons">
          <button className='btn green'>
            <span className='textLower'>
              X (YOU)
              </span> <br /> 
            <span className='counter'>
                {playerXWins !== 0 && playerXWins} 
              </span>
          </button>
          <button className="btn gray">
            <span className='textLower'>
              TIES
            </span> <br />
            <span className='counter'>
              {statusTies !== 0 && statusTies }
            </span>
          </button>
          <button className="btn yellow">
            <span className='textLower'>
              O (CPU)
            </span> <br />
            <span className='counter'>
              {playerOWins !== 0 && playerOWins}
            </span>
          </button>
        </div>
      </ul>
    </div>
  );
}

export default Board;