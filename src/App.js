import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from 'react-router-dom';
import { Client } from 'boardgame.io/react';
// import { Local } from 'boardgame.io/multiplayer';
import { SocketIO } from 'boardgame.io/multiplayer';
import { SkullKing } from './game';
import { SkullKingBoard } from './board';
import IndexPage from './pages/index';
import Axios from 'axios';


const SkullKingClient = Client({
    game: SkullKing,
    board: SkullKingBoard,
    multiplayer: SocketIO({ server: 'localhost:8000' }),
});

const App = () => (
    <Router>
        <div>

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
                <Route path="/play">
                    <div>
                        <SkullKingClient playerID="0" gameID="" />
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
                    <CreateRoom />
                </Route>
                <Route path="/">
                    <IndexPage />
                </Route>
            </Switch>
        </div>
    </Router>
);

function Home() {
    return <h2>Home</h2>;
}

function CreateRoom() {
    let match = useRouteMatch();
    let rooms = null;

    rooms = Axios.get('http://localhost:8001/games/SkullKing')
        .then(function (response) {
            return response.data.rooms;
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function() {
            console.log('thened');
        });

    console.log(rooms);
    return (
        <div>
            <h2>Create Game</h2>
            <p>Choose Number of players</p>
            <Link to="/create/1234">Play</Link>

            <Switch>
                <Route path={`${match.path}/:topicId`}>
                    <Topic />
                </Route>
                <Route path={match.path}>
                    <h3>Please select a topic.</h3>
                </Route>
            </Switch>
        </div>
    );
}

function Topic() {
    let { topicId } = useParams();
    return <h3>Requested topic ID: {topicId}</h3>;
}

export default App;