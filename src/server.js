const { Server } = require('boardgame.io/server');

const server = Server({
    games: [game1, game2],
});

server.run(8000);