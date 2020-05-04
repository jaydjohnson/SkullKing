import React from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom'
import './index.scss';

const options = [
    { value: 2, label: '2 Pirates' },
    { value: 3, label: '3 Pirates' },
    { value: 4, label: '4 Pirates' },
    { value: 5, label: '5 Pirates' },
    { value: 6, label: '6 Pirates' },
];


class IndexPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            redirectURL: null,
            numberPlayers: 0,
         }
    }

    handleSelectNumberPlayers = (event) => {
        this.setState({ numberPlayers: event.target.value });
    }

    createRoom = () => {
        Axios.post(this.props.lobbyHost + '/games/SkullKing/create', {
            numPlayers: this.state.numberPlayers,
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

        let selectOptions = options.map((option, i) => {
            return (<option key={i} value={option.value}>{option.label}</option>);
        })

        return (
            <div id="gameWindow">
                {this.renderRedirect()}
                <div className="header">
                    <h1>Skull King</h1>
                </div>
                <div className="gameWindow-content">
                    <p>Ahoy, matey! Welcome to Skull King!</p>
                    <p>This here voyage can be sailed with two to six pirates.<br />If ye be daft, an' would like to look the rules o'er click <a href='https://www.grandpabecksgames.com/copy-of-rules-cya'>'ere</a>.</p>
                    <div className="gameWindow-createLobby">
                        <p>Select yer crew size 'ere, then join the crew.</p>
                        <select className="playerSelect" value={numberPlayers} onChange={this.handleSelectNumberPlayers}>
                            <option value={0}>Select...</option>
                            {selectOptions}
                        </select>
                        {this.state.numberPlayers > 1 ? (<button onClick={this.createRoom}>Join Crew</button>) : ''}
                    </div>
                </div>
            </div>
        )
    }
}

export default IndexPage;