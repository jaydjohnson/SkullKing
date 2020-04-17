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
                <div>
                    <div
                        key={i}
                        className='card'
                    >
                        {this.props.G.board[i].card}
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
                    {this.props.G.players[this.props.playerID].hand[i]}
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

        return (
            <div>
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
