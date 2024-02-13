import React, { useState, useEffect } from 'react';
import { calculateWinner } from './calculate-winner';
import { Player } from '../../constants/Player';
import { Board3x3, Board4x4, Board5x5 } from './boards/size';
import Timer from '../timer';
import { getAchievementMessage } from './achievement-processing';
import './achievement.css';

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const currentSquares = history[currentMove];
  const [historyVisible, setHistoryVisible] = useState(false);
  const [playerXWins, setPlayerXWins] = useState(0);
  const [playerOWins, setPlayerOWins] = useState(0);
  const [totalGames, setTotalGames] = useState(0);
  const [boardSize, setBoardSize] = useState(1);
  const [playerType, setPlayerType] = useState(null);
  const [ws, setWs] = useState(null);
  const [timerActive, setTimerActive] = useState(false);
  const [gameTime, setGameTime] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [achievementMessage, setAchievementMessage] = useState(null);
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [messageTimeoutId, setMessageTimeoutId] = useState(null);

  useEffect(() => {
    const storedPlayerType = localStorage.getItem('playerType');

    if (storedPlayerType) {
      setPlayerType(String(storedPlayerType));
    }

    const webSocket = new WebSocket('ws://localhost:8080');
    setWs(webSocket);

    if (!ws) {
      webSocket.onopen = () => {
        console.log('Connected to the server');
        webSocket.send(JSON.stringify({ type: "newPlayer" }));
      };

      webSocket.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        switch(msg.type) {
          case "playerType":
            setPlayerType(msg.player);
            break;
          case "move":
            const receivedMove = msg.currentMove;
            const squares = msg.squares;
            setHistory((history) => {
              const newHistory = history.slice(0, receivedMove + 1);
              newHistory.push(squares);
              return newHistory;
            });
            setCurrentMove(receivedMove);
            setXIsNext(!xIsNext);
            break;
          case "timer":
            setGameTime(msg.time);
            break;
          case "gameOver":
            setTimerActive(false);
            break;
          default:
            break;
        }
      };

      webSocket.onclose = () => {
        console.log('Disconnected from the server');
      };

      return () => {
        webSocket.close();
      };
    } else {
      webSocket.close();
    }
  }, []);

  useEffect(() => {
    setXIsNext(currentMove % 2 === 0);
  }, [currentMove, xIsNext]);

  useEffect(() => {
    const winner = calculateWinner(currentSquares, boardSize);
    if (winner) {
      if (winner === Player.X) {
        setPlayerXWins((prev) => prev + 1);
      } else if (winner === Player.O) {
        setPlayerOWins((prev) => prev + 1);
      }
      setTotalGames((prev) => prev + 1);
      if (ws) {
        ws.send(JSON.stringify({ type: "gameOver" }));
      }
    } else if (!currentSquares.includes(null)) {
      setTotalGames((prev) => prev + 1);
      if (ws) {
        ws.send(JSON.stringify({ type: 'gameOver' }));
      }
    }

    if (winner || !currentSquares.includes(null)) {
      setTimerActive(false);
    }
  }, [currentSquares, boardSize]);

  useEffect(() => {
    const message = getAchievementMessage(playerType, playerXWins, playerOWins, totalGames, currentMove);

    if (message && !displayedMessages.includes(message.message)) {
      setAchievementMessage(message);
      setDisplayedMessages((prevMessages) => [...prevMessages, message.message]);

      if (messageTimeoutId) {
        clearTimeout(messageTimeoutId);
      }

      const timeoutId = setTimeout(() => {
        setAchievementMessage(null);
      }, 3000);

      setMessageTimeoutId(timeoutId);
    }
  }, [currentMove, playerType, playerXWins, playerOWins, totalGames, displayedMessages, messageTimeoutId]);

  function handleBoardSizeChange(event) {
    setBoardSize(Number(event.target.value));
    restartGame();
  }

  function handlePlay(nextSquares) {
    const nextHistory = history.slice(0, currentMove + 1);
    nextHistory.push(nextSquares);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    if (ws) {
      const currentPlayer = xIsNext ? "X" : "O";
      ws.send(JSON.stringify({ type: "move", squares: nextSquares, currentMove: nextHistory.length - 1, currentPlayer }));
    }

    if (!timerStarted) {
      setTimerStarted(true);
    }

    if (messageTimeoutId) {
      clearTimeout(messageTimeoutId);
    }

    const message = getAchievementMessage(playerXWins, playerOWins, totalGames, currentMove);

    if (message && !displayedMessages.includes(message.message)) {
      setAchievementMessage(message);
      setDisplayedMessages((prevMessages) => [...prevMessages, message.message]);

      const timeoutId = setTimeout(() => {
        setAchievementMessage(null);
      }, 3000);

      setMessageTimeoutId(timeoutId);
    }
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  function restartGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setXIsNext(true);
    setTimerActive(false);

    if (ws) {
      ws.send(JSON.stringify({ type: "gameOver" }));
    }
  }

  function toggleHistoryVisibility() {
    setHistoryVisible(prev => !prev);
  }

  const renderBoard = () => {
    const boardProps = {
      xIsNext,
      squares: currentSquares,
      onPlay: handlePlay,
      restartGame,
      toggleHistoryVisibility,
      playerXWins,
      playerOWins,
      totalGames,
    };

    switch (boardSize) {
      case 3:
        return <Board3x3 {...boardProps} />;
      case 4:
        return <Board4x4 {...boardProps} />;
      case 5:
        return <Board5x5 {...boardProps} />;
      default:
        return null;
    }
  };

  const moves = history.map((step, move) => (
    <li key={move}>
      <button onClick={() => jumpTo(move)}>
        {move ? `Go to move #${move}` : 'Go to game start'}
      </button>
    </li>
  ));

  return (
    <div className="game">
      <div className="game-board">{renderBoard()}</div>
      <div className="game-settings">
        <label>
          <select value={boardSize} onChange={handleBoardSizeChange} className="btn-primary">
            <option value="1"> Board size</option>
            <option value="3"> Board size: 3x3</option>
            <option value="4"> Board size: 4x4</option>
            <option value="5"> Board size: 5x5</option>
          </select>
        </label>
        <div className="game-timer">
          <Timer active={timerActive} time={gameTime} />
        </div>
      </div>
      <div className="game-info">
        <ol style={{ display: historyVisible ? 'block' : 'none' }}>
          <p>History of the game: </p>
          {moves}
        </ol>
      </div>
      {achievementMessage && (
        <div className="achievement-container">
          <div className="achievement-content">
              <p>{achievementMessage.message}</p>
            {achievementMessage.image && (
              <img className="achievement-image"
                src={achievementMessage.image}
                alt="Image achievement" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}