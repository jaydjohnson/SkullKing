import React from 'react';
import Axios from 'axios';
import Select from 'react-select';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from 'react-router-dom';
import './index.scss';

const options = [
    { value: 2, label: '2 Players' },
    { value: 3, label: '3 Players' },
    { value: 4, label: '4 Players' },
    { value: 5, label: '5 Players' },
    { value: 6, label: '6 Players' },
];


class IndexPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            playerID: null,
            playerName: localStorage.getItem('playerName') || '',
            playerCredentials: [],
            numberPlayers: null,
        }
    }

    componentDidMount() {
        this.refreshRooms();
    }

    refreshRooms = () => {
        Axios.get('http://localhost:8001/games/SkullKing')
            .then((response) => {
                this.setState({
                    rooms: response.data.rooms,
                });
                console.log(response.data.rooms);
            });
    }

    handleChangeName = (event) => {
        this.setState({playerName: event.target.value});
    }

    handleSelectNumberPlayers = (numberPlayers) => {
        this.setState({ numberPlayers });
        console.log('option seected: ', numberPlayers);
    }

    confirmName = () => {
        localStorage.setItem('playerName', this.state.playerName);
    }

    joinRoom = (room, playerID) => {
        let nextPlayerID = room.players.findIndex((player) => { return player.name === undefined});
        // let newCredentials = this.state.playerCredentials.slice();
        Axios.post('http://localhost:8001/games/SkullKing/'+ room.gameID + '/join', {
            playerID: nextPlayerID,
            playerName: this.state.playerName,
        }).then((response) => {
            let newCredentials = {
                ...this.stateplayerCredentials,
                ... {
                    [room.gameID]: {
                        playerID: nextPlayerID,
                        playerCredentials: response.data.playerCredentials,
                    }
                }
            };
            console.log(newCredentials);
            this.setState({
                playerCredentials: newCredentials,
            });
            localStorage.setItem('playerCredentials', JSON.stringify(newCredentials));
            this.refreshRooms();
        });
    }

    // leaveRoom = () => {

    // }

    createRoom = () => {
        Axios.post('http://localhost:8001/games/SkullKing/create', {
            numPlayers: this.state.numberPlayers.value,
        }).then((response) => {
            this.refreshRooms();
        });
    }

    render() {

        const { numberPlayers } = this.state;

        let rooms = this.state.rooms.map( (room, i) => {
            let players = room.players.map( (player, k) => {
                return (<li key={k}>{player.name}</li>);
            });
            return (<div key={i}>{room.gameID} {players} <button onClick={() => this.joinRoom(room, room.players.length)}>Join</button><button onClick={() => this.leaveRoom(room, room.players.length)}>Leave</button></div>);
        });
        return (
            <div id="gameWindow">
                <div className="header">
                    <h1>Skull King</h1>
                </div>
                <div className="gameWindow-content">
                    <input type="text" value={this.state.playerName} onChange={this.handleChangeName} />
                    <button onClick={this.confirmName}>Set Name</button> 
                    {this.state.playerName ? (<p>Welcome {this.state.playerName}</p>) : ''}
                    <Select
                        className="playerSelect"
                        value={numberPlayers}
                        onChange={this.handleSelectNumberPlayers}
                        options={options}
                    />
                    <button onClick={this.createRoom}>Create Room</button>
                    <h2>Open Rooms</h2>
                    {rooms}
                </div>
            </div>
        )
    }
}

export default IndexPage;