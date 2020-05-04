import React from 'react';
import Axios from 'axios';
import Select from 'react-select';
import { Redirect } from 'react-router-dom'
import './index.scss';

class RoomPage extends React.Component {
    constructor(props) {
        super(props);

        let playerCredentials = localStorage.getItem('playerCredentials')
        playerCredentials = playerCredentials === '' ? [] : JSON.parse(playerCredentials);
        this.state = {
            redirect: false,
            redirectURL: null,
            joinRoom: true,
            room: [],
            playerID: null,
            needName: false,
            playerName: localStorage.getItem('playerName') || '',
            nameTextField: localStorage.getItem('playerName') || '',
            playerCredentials: playerCredentials,
            numberPlayers: null,
        }
    }

    componentDidMount() {
        if (this.state.playerName.length > 0) {
            // Join room
            this.setState({needName: false});
        } else {
            this.setState({needName: true});
        }
        this.refreshRoom();
        // this.interval = setInterval(()=> this.refreshRoom(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    refreshRoom = () => {
        Axios.get(this.props.lobbyHost + '/games/SkullKing/' + this.props.gameID)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    room: response.data,
                });
                this.inRoom(response.data);
                if (this.state.joinRoom) {
                    this.joinRoom();
                }
            });
    }

    inRoom = (room) => {
        if (this.state.playerCredentials !== null && this.props.gameID in this.state.playerCredentials) {
            this.setState({joinRoom: false});
        } else {
            this.setState({joinRoom: true})
        }
    }

    joinRoom = () => {
        let nextPlayerID = this.state.room.players.findIndex((player) => { return player.name === undefined});
        Axios.post(this.props.lobbyHost + '/games/SkullKing/'+ this.props.gameID + '/join', {
            playerID: nextPlayerID,
            playerName: this.state.playerName,
        }).then((response) => {
            let newCredentials = {
                ...this.state.playerCredentials,
                ...{
                    [this.props.gameID]: {
                        playerID: nextPlayerID,
                        playerCredentials: response.data.playerCredentials,
                    }
                }
            };
            this.setState({
                playerCredentials: newCredentials,
            });
            localStorage.setItem('playerCredentials', JSON.stringify(newCredentials));
            this.refreshRoom();
        });
    }

    editName = () => {
        console.log('editing name');
        this.setState({needName: true});
    }

    handleChangeName = (event) => {
        this.setState({nameTextField: event.target.value});
    }

    confirmName = () => {
        this.setState({needName: false});
        this.setState({playerName: this.state.nameTextField})
        localStorage.setItem('playerName', this.state.nameTextField);
        this.joinRoom();

    }

    NameWindow = () => {
        return (
            <div className="roomPage-nameWindow">
                <h2>What be yar name?</h2>
                <input type="text" value={this.state.nameTextField} onChange={this.handleChangeName}></input>
                <button onClick={this.confirmName}>Avast!</button>
            </div>
        )
    }

    render() {
        let pageLink = this.props.serverHost + '/room/' + this.props.gameID;
        let playerList = '';
        // playerList = room.players.map( (player, k) => {
        //     return (<li key={k}>{player.name}</li>);
        // });

        return (
            <div>
                We be needing more pirates.  Share this here link to get your crew sailin!
                {pageLink}
                { this.state.needName === true ? (this.NameWindow()) : 'I got yourname'}
                <p>Players</p>
                <button onClick={this.editName}>Edit Name</button>
                <ul>
                    {playerList}
                </ul>
            </div>
        )
    }
}

export default RoomPage;
