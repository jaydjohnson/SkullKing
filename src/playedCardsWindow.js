import React from 'react';
import * as skCards from "./cardDeck";

class PlayerCardsWindow extends React.Component {
    render() {
        let playedCards = [];

        for (let i = 0; i < this.props.cards.length; i++) {
            let cardImage = skCards.getCardImage(this.props.cards[i].card);
            playedCards.push(
                <div key={'card' + i}>
                    <div
                        className='card'
                    >
                        <img src={"/img/cards/" + cardImage + '.png'} alt='card#' />
                    </div>
                    <div>
                        {this.props.playerNames[this.props.cards[i].player].name}
                        <br/>
                        {cardImage === 'tigres' ? ( this.props.cards[i].card.value === 20 ? 'Played Pirate' : 'Played Escape' ) : ''}
                    </div>
                </div>
            )
        }

        let playedCardsList = this.props.phase === 'bid' ? '' : 
            (<div className="playedCardsWindow-cards">{playedCards}</div>);

        return (
            <div className="playedCardsWindow">
                {this.props.phase === 'bid' ? '' : (<h2>Played Cards:</h2>)}
                {playedCardsList}
            </div>
        )
    }
}

export default PlayerCardsWindow;