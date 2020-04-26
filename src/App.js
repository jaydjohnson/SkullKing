import React from 'react';
import { Client } from 'boardgame.io/react';
import { Local } from 'boardgame.io/multiplayer';
import { SocketIO } from 'boardgame.io/multiplayer';
import SkullKing from './game.js';
import SkullKingBoard from './board.js';


const SkullKingClient = Client({
    game: SkullKing,
    board: SkullKingBoard,
    multiplayer: Local(),
    numPlayers: 4,
    debug: false,
});

const App = () => (
    <div>
        <SkullKingClient playerID="0" />
        <SkullKingClient playerID="1" />
        <SkullKingClient playerID="2" />
        <SkullKingClient playerID="3" />
    </div>
);

export default App;