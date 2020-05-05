const { Server } = require('boardgame.io/server');
import path from 'path';
import Koa from 'koa';
import serve from 'koa-static';
import mount from 'koa-mount';
const SkullKing = require('./game.js').SkullKing;

const server = Server({
    games: [SkullKing],
});

const lobbyConfig = {
    apiPort: 8001,
}

// Build path relative to the server.js file
const frontEndAppBuildPath = path.resolve(__dirname, '../build');

// Serve the build directory
const static_pages = new Koa();
static_pages.use(serve(frontEndAppBuildPath));
server.app.use(mount('/', static_pages));
server.run({ port: 8000, lobbyConfig }, () => {
    server.app.use(
        async (ctx, next) => await serve(frontEndAppBuildPath)(
            Object.assign(ctx, { path: 'index.html' }),
            next
        )
    )
});
