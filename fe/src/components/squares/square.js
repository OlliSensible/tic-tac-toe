import React from 'react';
import { Player } from '../../constants/Player';

function Square({ value, onSquareClick }) {
  let playerClass = '';
  if (value === Player.X) {
    playerClass = 'player_X';
  } else if (value === Player.O) {
    playerClass = 'player_O';
  }

  return (
    <button className={`square ${playerClass}`} onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default Square;