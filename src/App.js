import React from 'react';
import { Client } from 'boardgame.io/react';
import { Local } from 'boardgame.io/multiplayer';
import SkullKing from './game.js';
import SkullKingBoard from './board.js';


const SkullKingClient = Client({
    game: SkullKing,
    board: SkullKingBoard,
    multiplayer: Local(),
});

const App = () => (
    <div>
        <SkullKingClient playerID="0" />
        <SkullKingClient playerID="1" />
    </div>
);

export default App;