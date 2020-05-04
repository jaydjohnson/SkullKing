import React from 'react';
import Axios from 'axios';
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
        this.interval = setInterval(()=> this.refreshRoom(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    refreshRoom = () => {
        Axios.get(this.props.lobbyHost + '/games/SkullKing/' + this.props.gameID)
            .then((response) => {
                this.setState({
                    room: response.data,
                });
                if (this.state.playerName.length && ! this.inRoom()) {
                    this.joinRoom();
                }
            }).catch((error) => {
                this.setState({error: 'Game Not Found'});
            });
    }

    inRoom = () => {
        if (this.state.playerCredentials !== null && this.props.gameID in this.state.playerCredentials) {
            this.setState({joinRoom: false});
            return true;
        } else {
            this.setState({joinRoom: true});
            return false;
        }
    }

    joinRoom = () => {
        if (this.inRoom()) {
            return true;
        }
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
                playerID: nextPlayerID,
            });
            localStorage.setItem('playerCredentials', JSON.stringify(newCredentials));
            this.refreshRoom();
        });
    }

    leaveRoom = () => {
        Axios.post(this.props.lobbyHost + '/games/SkullKing/' + this.props.gameID + '/leave', {
            playerID: this.state.playerCredentials[this.props.gameID].playerID,
            credentials: this.state.playerCredentials[this.props.gameID].playerCredentials,
        }).then((response) => {
            let newCredentials = { ...this.state.playerCredentials };
            delete newCredentials[this.props.gameID];
            localStorage.setItem('playerCredentials', JSON.stringify(newCredentials));
            this.setState({ playerCredentials: newCredentials });
            this.setRedirect('/');
        });
    }

    setRedirect = (url) => {
        this.setState({ redirect: true, redirectURL: url });
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirectURL} />
        }
    }

    editName = () => {
        this.setState({needName: true});
    }

    handleChangeName = (event) => {
        this.setState({nameTextField: event.target.value});
    }

    confirmName = () => {
        localStorage.setItem('playerName', this.state.nameTextField);
        this.setState({ needName: false, playerName: this.state.nameTextField }, this.joinRoom);
    }

    NameWindow = () => {
        return (
            <div className="roomWindow-name">
                <h2>What be yar name?</h2>
                <p>An' keep yer name short... The Skull King 'as isssues with long names!</p>
                <input type="text" value={this.state.nameTextField} onChange={this.handleChangeName}></input>
                <button onClick={this.confirmName}>Yo ho ho!</button>
            </div>
        )
    }

    render() {
        let pageLink = window.location.origin + '/room/' + this.props.gameID;
        let playerList = '';
        let emptySeats = ['not empty'];
        if (this.state.room.players !== undefined) {
            playerList = this.state.room.players.map( (player, k) => {
                return (<li key={k}>{player.name === undefined ? 'Waitin\' fer crew member...' : player.name}</li>);
            });
            emptySeats = this.state.room.players.filter((player) => player.name === undefined);
        }

        if (emptySeats.length === 0) {
            //console.log('empty');
            this.setRedirect('/game/' + this.props.gameID);
        }

        return (
            <div id="gameWindow" className="roomWindow">
                {this.renderRedirect()}
                <div className="header">
                    <h1>Skull King</h1>
                </div>
                {this.state.error ? (
                    <div className="roomWindow-content">
                        <p>{this.state.error}</p>
                        <button onClick={() => {this.setRedirect('/')}}>Back to Home</button>
                    </div>
                    ) : (
                    <div className="roomWindow-content">
                        <div className="roomWindow-info">
                            <p>Ye need more gentlemen o' fortune. Share this here link to get yer crew plunderin'.</p>
                            <p className="pageLink">{pageLink}</p>
                            <button onClick={() => { navigator.clipboard.writeText(pageLink) }}>Copy Link</button>
                        </div>
                        {this.state.needName === true ? (this.NameWindow()) : (
                            <div className="roomWindow-players">
                                <h2>Crew Members</h2>
                                <p>When yer ship be full, we shall set sail!</p>
                                {/* <button onClick={this.editName}>Edit Name</button> */}
                                <ul>
                                    {playerList}
                                </ul>
                                <p>If this not be the 'ight crew fer ya</p>
                                <button onClick={this.leaveRoom}>Abandon ship</button>
                            </div>   
                        )}                    
                    </div>
                )}
            </div>
        )
    }
}

export default RoomPage;
