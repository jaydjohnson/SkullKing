import React from 'react';

class PlayerWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        let playerList = [];
        let playerNames = [];
        for (let i = 0; i < this.props.players.length; i++) {
            playerList.push(
                <td 
                    key={i}
                    className={( parseInt(this.props.activePlayer) === i && ! this.props.bidding && this.props.phase !== 'endHand' ? 'active' : '' )}
                >
                    {this.props.bidding ? '' : this.props.players[i].tricks + ' / '} 
                    {this.props.bidding ? (this.props.players[i].currentBid === null ? '??' : '✓') : this.props.players[i].currentBid}
                </td>
            );
            playerNames.push(
                <td key={i} className="playerNames">{this.props.players[i].name}</td>
            );
        }

        let scoreList = [];
        for (let i = 0; i < this.props.scores.length; i++) {
            let playerRoundScores = [];
            for (let j = 0; j < this.props.players.length; j++) {
                playerRoundScores.push(
                    <td key={'Round' + j}>
                        <span className="playerBid">
                            {this.props.scores[i][j].currentBid + '/' + this.props.scores[i][j].tricks}
                        </span>
                        <span className="roundPoints">
                            {this.props.scores[i][j].roundBonus}
                        </span>
                        {this.props.scores[i][j].score}
                    </td>
                )
            }
            scoreList.push(
                <tr
                    key={i}
                >
                    <td>{i+1}</td>
                    {playerRoundScores}
                </tr>
            );
        }

        return (
            <div id="player-window">

                Current Round: {this.props.currentRound}

                <table className="scoreTable">
                    <thead>
                        <tr>
                            <td></td>
                            {playerNames}
                        </tr>
                    </thead>
                    <tbody>
                        {scoreList}
                        <tr><td>Current</td>{playerList}</tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default PlayerWindow;