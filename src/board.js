import React from 'react';
import PropTypes from 'prop-types';
import './board.css';

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
        let bidNumbers = [];

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

        for (let i = 0; i < this.props.G.round; i++) {
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

        for (let i = 0; i <= this.props.G.round; i++) {
            bidNumbers.push(
                <div
                    key={i}
                    className='bidNumber ' 
                    onClick={() => this.selectBid(i)}
                >
                    {i}
                </div>
            );
        }

        let bidList = '';
        if (this.props.G.bidding) {
            bidList = ( <div id="bid-window"><h3>Select your bid</h3><div className="bid-list">{bidNumbers}</div><button>Yo Ho Ho!</button></div> )
        }

        return (
            <div>
                <div id="board">
                    <h2>Played Cards</h2>
                    {playedCards}
                </div> 
                {bidList}
                <div id="hand">
                    <h3>Your cards</h3>
                    {cards}
                </div>
            </div>
        );
    }
}

export default SkullKingBoard;
