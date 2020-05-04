import React from 'react';
import Axios from 'axios';
import Select from 'react-select';
import { Redirect } from 'react-router-dom'
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

        let playerCredentials = localStorage.getItem('playerCredentials')
        playerCredentials = playerCredentials === '' ? [] : JSON.parse(playerCredentials);
        this.state = {
            redirect: false,
            redirectURL: null,
            rooms: [],
            playerID: null,
            playerName: localStorage.getItem('playerName') || '',
            playerCredentials: playerCredentials,
            numberPlayers: null,
            tempName: localStorage.getItem('playerName') || '',
        }
    }

    componentDidMount() {
        this.refreshRooms();
        this.interval = setInterval(()=> this.refreshRooms(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    syncLocalRooms = () => {
        if (this.state.rooms.length === 0) {
            this.setState({playerCredentials: [] });
            localStorage.setItem('playerCredentials', this.state.playerCredentials);
        }
    }

    refreshRooms = () => {
        Axios.get(this.props.lobbyHost + '/games/SkullKing')
            .then((response) => {
                this.setState({
                    rooms: response.data.rooms,
                });
                this.syncLocalRooms();
            });
    }

    handleChangeName = (event) => {
        this.setState({tempName: event.target.value});
    }

    handleSelectNumberPlayers = (numberPlayers) => {
        this.setState({ numberPlayers });
    }

    confirmName = () => {
        this.setState({playerName: this.state.tempName})
        localStorage.setItem('playerName', this.state.tempName);
    }

    joinRoom = (room, playerID) => {
        let nextPlayerID = room.players.findIndex((player) => { return player.name === undefined});
        Axios.post(this.props.lobbyHost + '/games/SkullKing/'+ room.gameID + '/join', {
            playerID: nextPlayerID,
            playerName: this.state.playerName,
        }).then((response) => {
            let newCredentials = {
                ...this.state.playerCredentials,
                ...{
                    [room.gameID]: {
                        playerID: nextPlayerID,
                        playerCredentials: response.data.playerCredentials,
                    }
                }
            };
            this.setState({
                playerCredentials: newCredentials,
            });
            localStorage.setItem('playerCredentials', JSON.stringify(newCredentials));
            this.refreshRooms();
        });
    }

    leaveRoom = (room) => {
        Axios.post(this.props.lobbyHost + '/games/SkullKing/'+ room.gameID + '/leave', {
            playerID: this.state.playerCredentials[room.gameID].playerID,
            credentials: this.state.playerCredentials[room.gameID].playerCredentials,
        }).then((response) => {
            let newCredentials = {...this.state.playerCredentials};
            delete newCredentials[room.gameID];
            localStorage.setItem('playerCredentials', JSON.stringify(newCredentials));
            this.setState({ playerCredentials: newCredentials });
            this.refreshRooms();
        });
    }

    createRoom = () => {
        Axios.post(this.props.lobbyHost + '/games/SkullKing/create', {
            numPlayers: this.state.numberPlayers.value,
        }).then((response) => {
            this.setState({redirect: true, redirectURL: '/room/' + response.data.gameID});
        });
    }

    setRedirect = (room) => {
        this.setState({redirect: true, redirectURL: '/game/' + room.gameID});
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirectURL} />
        }
    }

    render() {

        const { numberPlayers } = this.state;

        return (
            <div id="gameWindow">
                {this.renderRedirect()}
                <div className="header">
                    <h1>Skull King</h1>
                </div>
                <div className="gameWindow-content">
                    <p>Ahoy, matey! Welcome to Skull King!</p>
                    <div className="gameWindow-createLobby">
                        <p>To create a room, Select the number of players and click Create Room.</p>
                        <Select
                            className="playerSelect"
                            value={numberPlayers}
                            onChange={this.handleSelectNumberPlayers}
                            options={options}
                        />
                        {this.state.numberPlayers !== null ? (<button onClick={this.createRoom}>Create Room</button>) : ''}
                    </div>
                </div>
            </div>
        )
    }
}

export default IndexPage;