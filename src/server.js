const { Server } = require('boardgame.io/server');
const SkullKing = require('./game.js').SkullKing;
const server = Server({
    games: [SkullKing],
});

server.run(8000);