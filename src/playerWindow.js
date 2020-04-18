import React from 'react';

class PlayerWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        let playerList = [];
        for (let i = 0; i < this.props.players.length; i++) {
            let nextPlayer = this.props.nextPlayer === i ? '*' : '';
            playerList.push(
                <tr 
                    key={i}
                    className={'player ' + ( parseInt(this.props.activePlayer) === i && ! this.props.bidding ? 'active' : '' )}
                >
                    <td>{this.props.players[i].name}{nextPlayer}</td>
                    <td>{this.props.players[i].score} ({this.props.players[i].potentialScore})</td>
                    <td>{this.props.bidding ? (this.props.players[i].currentBid === null ? '??' : '✓') : this.props.players[i].currentBid}</td>
                    <td>{this.props.players[i].tricks}</td>
                </tr>
            );
        }

        return (
            <div id="player-window">
                <table>
                    <thead>
                        <tr>
                            <td>Current Round: {this.props.currentRound}</td>
                        </tr>
                        <tr>
                            <td>Players</td>
                            <td>Score</td>
                            <td>Bid</td>
                            <td>Tricks</td>
                        </tr>
                    </thead>
                    <tbody>
                    {playerList}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default PlayerWindow;