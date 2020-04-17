import React from 'react';
import PropTypes from 'prop-types';
import './board.css';
import BidWindow from './bidWindow.js';

class SkullKingBoard extends React.Component {
    static propTypes = {
        G: PropTypes.any.isRequired,
        ctx: PropTypes.any.isRequired,
        moves: PropTypes.any.isRequired,
        playerID: PropTypes.string,
        isActive: PropTypes.bool,
        isMultiplayer: PropTypes.bool,
    }

    onClick = card => {
        this.props.moves.chooseCard(card);
    }

    selectBid = bid => {
        this.props.moves.selectBid(bid);
    }

    handleBidClick = (bid, player) => {
        this.props.moves.selectBidAmount(bid);
    }

    render() {
        let playedCards = [];
        let cards = [];

        for (let i = 0; i < this.props.G.board.length; i++) {
            playedCards.push(
                <div key={'card'+i}>
                    <div
                        className='card'
                    >
                        {this.props.G.board[i].card.value + ' ' + this.props.G.board[i].card.color}
                    </div>
                    <div>
                        {this.props.G.board[i].player}
                    </div>
                </div>
            )
        }

        let playedCardsList = (<div id="playedCards"><h3>Played Cards:</h3><div className="playedCards-list">{playedCards}</div></div>);

        for (let i = 0; i < this.props.G.players[this.props.playerID].hand.length; i++) {
            cards.push(
                <div 
                    key={i}
                    className='card'
                    onClick={() => this.onClick(i)}
                >
                    {this.props.G.players[this.props.playerID].hand[i].value + ' ' + this.props.G.players[this.props.playerID].hand[i].color}
                </div>
            );
        }

        let playerCardList = (<div id="playerCards" className={this.props.isActive && ! this.props.G.bidding ? 'active-turn' : ''}><h3>Your Cards:</h3><div className="playerCards-list">{cards}</div></div>);
        let bidWindow = '';
        if (this.props.G.bidding) {
            bidWindow = (<BidWindow
                round={this.props.G.round}
                player={this.props.playerID} 
                onClick={this.handleBidClick}
            />);
        }

        let playerList = [];
        for (let i = 0; i < this.props.G.players.length; i++) {
            console.log(this.props.ctx.playOrderPos, i);
            playerList.push(
                <tr 
                    key={i}
                    className={'player ' + this.props.ctx.playOrderPos === i ? 'active' : ''}
                    //className='player'
                >
                    <td>{this.props.G.players[i].name}</td>
                    <td>{this.props.G.players[i].score}</td>
                    <td>{this.props.G.bidding ? (this.props.G.players[i].currentBid === null ? '??' : '✓') : this.props.G.players[i].currentBid}</td>
                    <td>{this.props.G.bidding ? '0' : this.props.G.players[i].tricks}</td>
                </tr>
            );
        }

        return (
            <div>
                <div id="playerList">
                    <table>
                        <thead>
                            <tr>
                                <td>Current Round: {this.props.G.round}</td>
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
                <div id="board">
                    {playedCardsList}
                </div> 
                {bidWindow}
                {playerCardList}
            </div>
        );
    }
}

export default SkullKingBoard;
