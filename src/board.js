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

    render() {
        let playedCards = [];
        let cards = [];

        for (let i = 0; i < this.props.G.board.length; i++) {
            playedCards.push(
                <div
                    key={i}
                    className='card'
                >
                    {this.props.G.board[i]}
                </div>
            )
        }

        let playedCardsList = (<div id="playedCards"><h3>Played Cards:</h3><div className="playedCards-list">{playedCards}</div></div>);

        for (let i = 0; i < this.props.G.hand[this.props.playerID].length; i++) {
            cards.push(
                <div 
                    key={i}
                    className='card'
                    onClick={() => this.onClick(i)}
                >
                    {this.props.G.hand[this.props.playerID][i]}
                </div>
            );
        }

        let playerCardList = (<div id="playerCards"><h3>Your Cards:</h3><div className="playerCards-list">{cards}</div></div>);

        return (
            <div>
                <div id="board">
                    {playedCardsList}
                </div> 
                <BidWindow round={this.props.G.round} />
                {playerCardList}
            </div>
        );
    }
}

export default SkullKingBoard;
