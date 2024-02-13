import React from 'react';
import Board from './board';

export function Board3x3(props) {
  return <Board size={3} {...props} />;
}

export function Board4x4(props) {
  return <Board size={4} {...props} />;
}

export function Board5x5(props) {
  return <Board size={5} {...props} />;
}