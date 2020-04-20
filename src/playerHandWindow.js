import React from 'react';
import {getAllowedCards} from './cardDeck';

class PlayerHandWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    canPlayCard = (card) => {
        return true;
        console.log(this.props.G.players[this.props.playerID].hand[card].color);
        if (this.props.G.players[this.props.playerID].hand[card].color === 'green') {
            return true;
        }
    }

    selectCard = card => {
        if (this.canPlayCard(card)) {
            this.props.onSelectCard(card);
        }
    }

    render() {

        let cards = [];
        let allowedCards = [];
        allowedCards = cardDeck.getAllowedCards(this.props.cards, this.props.playedCards);
        for (let i = 0; i < this.props.cards.length; i++) {
            cards.push(
                <div
                    key={i}
                    className='card'
                    onClick={() => this.selectCard(i)}
                >
                    {this.props.cards[i].value + ' ' + this.props.cards[i].color}
                </div>
            );
        }

        let playerHandList = (
            <div id="playerCards" className={this.props.isActive && !this.props.bidding ? 'active-turn' : ''}>
                <h3>Your Cards:</h3>
                <div className="playerCards-list">{cards}</div>
            </div>)
        ;


        return (
            <div className="playerHand">
                {playerHandList}
            </div>
        )
    }
}

export default PlayerHandWindow;