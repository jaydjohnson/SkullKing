import React from 'react';

class ScoreBoardWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        let bidList = [];
        let playerNames = [];
        for (let i = 0; i < this.props.players.length; i++) {
            bidList.push(
                <td 
                    key={i}
                    className={( parseInt(this.props.activePlayer) === i && ! this.props.bidding && this.props.phase !== 'endHand' ? 'active' : '' )}
                >
                    {this.props.bidding ? (this.props.players[i].currentBid === null ? '??' : '✓') : this.props.players[i].currentBid}
                    {this.props.bidding ? '' : '/' + this.props.players[i].tricks}
                </td>
            );
            playerNames.push(
                <td key={i} className="playerNames">{this.props.playerNames[i].name}</td>
            );
        }

        let scoreList = [];
        for (let i = 0; i < this.props.scores.length; i++) {
            let playerRoundScores = [];
            for (let j = 0; j < this.props.players.length; j++) {
                let player = this.props.scores[i][j];
                let bidWon = player.currentBid === player.tricks;

                playerRoundScores.push(
                    <td key={'Round' + j}>
                        <span className="playerBid">
                            {player.currentBid + '/' + player.tricks}
                        </span>
                        <span className={"roundPoints " + (player.roundBonus > 0 ? (bidWon ? 'won' : 'lost') : '')}>
                            {player.roundBonus}
                        </span>
                        {player.score}
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
            <div className="scoreBoardWindow">
                <table className="scoreBoardWindow-table">
                    <thead>
                        <tr className="scoreBoardWindow-playerRow">
                            <td></td>
                            {playerNames}
                        </tr>
                    </thead>
                    <tbody>
                        {scoreList}
                        <tr><td>Bids</td>{bidList}</tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ScoreBoardWindow;