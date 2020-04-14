import React from 'react';
import PropTypes from 'prop-types';

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

    render() {
        let playedCards = [];
        let cards = [];

        for (let i = 0; i < this.props.G.board; i++) {
            playedCards.push(
                <div
                    className='card'
                >
                    {this.props.G.board[i]}
                </div>
            )
        }

        for (let i = 0; i < this.props.G.round; i++) {
            cards.push(
                <div 
                    className='card'
                    onClick={()=>this.onClick(i) }
                >
                    {this.props.G.hand[this.props.playerID][i]}
                </div>
            )
        }


        return (
            <div>
                <div id="board">
                    <h2>Played Cards</h2>
                    {playedCards}
                </div>
                <div id="hand">
                    <h3>Your cards</h3>
                    {cards}
                </div>
            </div>
        );
    }
}

export default SkullKingBoard;
