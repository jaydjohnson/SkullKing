import React from 'react';
import * as skCards from "./cardDeck";

class PlayerHandWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    canPlayCard = (card) => {
        return skCards.isCardAllowed(this.props.cards[card], this.props.cards, this.props.playedCards);
    }

    selectCard = card => {
        if (this.canPlayCard(card)) {
            this.props.onSelectCard(card);
        }
    }

    render() {

        let cards = [];
        let cardAllowed = null;
        for (let i = 0; i < this.props.cards.length; i++) {
            cardAllowed = skCards.isCardAllowed(this.props.cards[i], this.props.cards, this.props.playedCards);
            cards.push(
                <div
                    key={i}
                    className={'card ' + (cardAllowed ? 'cardAllowed' : '')}
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