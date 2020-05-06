const { Server } = require('boardgame.io/server');
const SkullKing = require('./game.js').SkullKing;
const server = Server({
    games: [SkullKing],
});

const lobbyConfig = {
    apiPort: 8001,
}
server.run({ port: 8000, lobbyConfig });