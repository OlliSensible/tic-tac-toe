const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let players = { x: null, o: null };
let gameTime = 0;
let gameTimer = null;
let timerStarted = false;

function startGameTimer() {
  gameTime = 0;
  gameTimer = setInterval(() => {
    gameTime++;
    sendTimeUpdate();
  }, 1000);
}

function sendTimeUpdate() {
  const message = JSON.stringify({ type: "timer", time: gameTime });
  if (players.x) players.x.send(message);
  if (players.o) players.o.send(message);
}

function stopGameTimer() {
  clearInterval(gameTimer);
  gameTimer = null;
}

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);

    const msg = JSON.parse(message);

    switch(msg.type) {
      case "newPlayer":
        if (!players.x) {
          players.x = ws;
          ws.send(JSON.stringify({ type: "playerType", player: "X" }));
          if (!players.o) startGameTimer();
        } else if (!players.o) {
          players.o = ws;
          ws.send(JSON.stringify({ type: "playerType", player: "O" }));
        } else {
          ws.send(JSON.stringify({ type: "error", message: "Already two players in game" }));
        }
        break;

      case "move":
        const opponent = players.x === ws ? players.o : players.x;
        if (opponent) {
          opponent.send(JSON.stringify({ type: "move", ...msg }));
          if (!timerStarted) { 
            timerStarted = true;
            startGameTimer();
          }
        }
        break;

      case "gameOver":
        stopGameTimer();
        timerStarted = false;
        break;
    }
  });

  ws.on('close', function() {
    if(players.x === ws) players.x = null;
    if(players.o === ws) players.o = null;
    console.log("Player left");
    stopGameTimer();
    timerStarted = false; 
  });
});

console.log('Server is running on port 8080');