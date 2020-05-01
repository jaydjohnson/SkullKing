import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from 'react-router-dom';
import { Client } from 'boardgame.io/react';
// import { Local } from 'boardgame.io/multiplayer';
import { SocketIO } from 'boardgame.io/multiplayer';
import { SkullKing } from './game';
import { SkullKingBoard } from './board';
import IndexPage from './pages/index';

const serverHost = 'http://192.168.1.4:8000';
const lobbyHost = 'http://192.168.1.4:8001';

const SkullKingClient = Client({
    game: SkullKing,
    board: SkullKingBoard,
    multiplayer: SocketIO({ server: serverHost }),
});

const App = () => (
    <Router>
        <div>

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
                <Route path="/game">
                    <PlayGame />
                    <div>
                        {/* <SkullKingClient playerID="0" gameID="" /> */}
                    </div>
                </Route>
                <Route path="/create">
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/game">Game</Link>
                            </li>
                            <li>
                                <Link to="/create">create</Link>
                            </li>
                        </ul>
                    </nav>
                </Route>
                <Route path="/">
                    <IndexPage serverHost={serverHost} lobbyHost={lobbyHost} />
                </Route>
            </Switch>
        </div>
    </Router>
);

function PlayGame() {
    let match = useRouteMatch();

    return (
        <div>
            <Switch>
                <Route path={`${match.path}/:gameID`}>
                    <LoadGame />
                </Route>
                <Route path={match.path}>
                    <h3>Please select a topic.</h3>
                </Route>
            </Switch>
        </div>
    );
}

function LoadGame() {
    let { gameID } = useParams();
    let playerCredentials = JSON.parse(localStorage.getItem('playerCredentials'));
    let playerID = playerCredentials[gameID].playerID;
    let credentials = playerCredentials[gameID].playerCredentials;
    console.log('playerid', playerID);
    return <SkullKingClient playerID={playerID.toString()} gameID={gameID.toString()} credentials={credentials} debug1={false}/>;
}

export default App;