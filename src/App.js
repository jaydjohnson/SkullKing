import React from 'react';
import { BrowserRouter as Router, Switch, Route, useRouteMatch, useParams } from 'react-router-dom';
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';
import { SkullKing } from './game';
import { SkullKingBoard } from './board';
import IndexPage from './routes/index';
import RoomPage from './routes/room';

const serverHost = 'http://skullking.notssdd.com:8000';
const lobbyHost = 'http://skullking.notssdd.com:8001';

const SkullKingClient = Client({
    game: SkullKing,
    board: SkullKingBoard,
    multiplayer: SocketIO({ server: serverHost }),
});

const App = () => (
    <Router>
        <div>
            <Switch>
                <Route path="/game">
                    <PlayGame />
                </Route>
                <Route path="/room">
                    <JoinRoom />
                </Route>
                <Route path="/">
                    <IndexPage serverHost={serverHost} lobbyHost={lobbyHost} />
                </Route>
            </Switch>
        </div>
    </Router>
);

function JoinRoom() {
    let match = useRouteMatch();
    
    return (
        <div>
            <Switch>
                <Route path={`${match.path}/:roomID`}>
                    <LoadRoom />
                </Route>
                <Route path={match.path}>
                    <h3>You need a valid Room ID.</h3>
                </Route>
            </Switch>
        </div>
    )
}

function LoadRoom() {
    let { roomID } = useParams();
    return (<RoomPage gameID={roomID} serverHost={serverHost} lobbyHost={lobbyHost} />);
}

function PlayGame() {
    let match = useRouteMatch();

    return (
        <div>
            <Switch>
                <Route path={`${match.path}/:gameID`}>
                    <LoadGame />
                </Route>
                <Route path={match.path}>
                    <h3>You need a valid Game ID.</h3>
                </Route>
            </Switch>
        </div>
    );
}

function LoadGame() {
    let { gameID } = useParams();
    let playerCredentials = JSON.parse(localStorage.getItem('playerCredentials'));
    if (gameID in playerCredentials) {
        let playerID = playerCredentials[gameID].playerID;
        let credentials = playerCredentials[gameID].playerCredentials;
        // Check game exists
        return <SkullKingClient playerID={playerID.toString()} gameID={gameID.toString()} credentials={credentials} debug={false}/>;
    }
    return (<h2>Sorry that game is not found</h2>);
}

export default App;