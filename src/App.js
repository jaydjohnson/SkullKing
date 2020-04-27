import React from 'react';
import { Client } from 'boardgame.io/react';
// import { Local } from 'boardgame.io/multiplayer';
import { SocketIO } from 'boardgame.io/multiplayer';
import { SkullKing } from './game';
import { SkullKingBoard } from './board';


const SkullKingClient = Client({
    game: SkullKing,
    board: SkullKingBoard,
    multiplayer: SocketIO({ server: 'localhost:8000' }),
});

const App = () => (
    <div>
        <SkullKingClient playerID="0" />
    </div>
);

export default App;