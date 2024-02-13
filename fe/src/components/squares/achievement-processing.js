import { Player } from "../../constants/Player";
import { ONE, TEN } from "../../constants/AchievementMessage";
import { setLocalStorageData } from "../../utils/local-storage";

function getAchievementMessage(playerChoice, playerXWins, playerOWins, totalGames, currentMove) {
  let achievementMessage = null;
  let playerWins, currentMoveWins, opponentWins, currentTies, threeMoves;
  let threeMove = 0;

  if (playerChoice === Player.X) {
    playerWins = playerXWins;
    currentMoveWins = 5;
    opponentWins = playerOWins;
    currentTies = totalGames - playerXWins - playerOWins;
    threeMoves = currentMove === currentMoveWins;
  } else if (playerChoice === Player.O) {
    playerWins = playerOWins;
    currentMoveWins = 6;
    opponentWins = playerXWins;
    currentTies = totalGames - playerXWins - playerOWins;
    threeMoves = currentMove === currentMoveWins;
  }

  if (playerWins === TEN) {
    achievementMessage = {
      message: 'You have won 10 times',
      image: 'images/achievement-processing/10-win.png',
    };
  } else if (playerWins === ONE) {
    achievementMessage = {
      message: 'You have won 1 time',
      image: 'images/achievement-processing/1-win.png',
    };
  } else  if (threeMoves && playerWins) {
    achievementMessage = {
    message: 'You defeated the super opponent in three moves 1 times',
    image: 'images/achievement-processing/3-move.png',
    };
    threeMove += 1;
    setLocalStorageData('threeMove', threeMove)
  } 
  
  if (opponentWins === ONE) {
    achievementMessage = {
      message: 'You lost 1 time',
      image: 'images/achievement-processing/lose.png',
    };
  }
  if (opponentWins === TEN) {
    achievementMessage = {
      message: 'You lost 10 time',
      image: 'images/achievement-processing/lose.png',
    };
  } else if (currentTies === TEN) {
    achievementMessage = {
      message: 'You have a draw 10 time',
      image: 'images/achievement-processing/draw.png',
    };
  } else if (currentTies === ONE) {
    achievementMessage = {
      message: 'You played to a draw 1 times',
      image: 'images/achievement-processing/draw.png',
    };
  }

  if (playerWins) {
    playerWins = 1 + playerWins;
    setLocalStorageData('playerWins', playerWins);
  }
  if (opponentWins) {
    opponentWins = 1 + opponentWins;
    setLocalStorageData('opponentWins', opponentWins);
  }
  if (currentTies) {
    currentTies = 1 + currentTies;
    setLocalStorageData('currentTies', currentTies);
  }

  if (achievementMessage !== null) {
    return {
      message: achievementMessage.message,
      image: achievementMessage.image,
    };
  }

  return null;
}

export { getAchievementMessage };