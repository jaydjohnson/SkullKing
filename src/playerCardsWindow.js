import React from 'react';
import * as skCards from "./cardDeck";
import TigresWindow from './tigresWindow';

class PlayerCardsWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            card: null,
            chooseTigresValue: false,
            selectedTigresValue: null,
        }
    }

    componentDidMount() {
        skCards.SkullKingDeck().forEach((card) => {
            let img = new Image();
            let cardImage = skCards.getCardImage(card);
            img.src = process.env.REACT_APP_IMAGE_HOST + '/cards/' + cardImage +'.png';
        });
    }

    canPlayCard = (card) => {
        return skCards.isCardAllowed(this.props.cards[card], this.props.cards, this.props.playedCards);
    }

    selectCard = card => {
        if (this.canPlayCard(card)) {
            if (this.props.cards[card].color === 'tigres') {
                this.setState({card: card, chooseTigresValue: true });
                return;
            }
            this.props.onSelectCard(card, this.state.selectedTigresValue);
        }
    }

    handleSelectTigresValue = value => {
        this.props.onSelectCard(this.state.card, value);
        this.setState({selectedTigresValue: null, chooseTigresValue: false});
    }

    handleTigresClose = () => {
        this.setState({selectedTigresValue: null, chooseTigresValue: false});
    }

    getNumber = () => {
        return ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'][this.props.cards.length-1];
    }

    render() {

        let activeTurn = this.props.isActive && !this.props.bidding && this.props.phase !== 'endHand';
        
        let tigresWindow = this.state.chooseTigresValue && this.props.isActive ? (
            <TigresWindow
                onClick={this.handleSelectTigresValue}
                onClose={this.handleTigresClose}
            />
        ) : '';

        let cards = [];
        let cardAllowed = null;
        for (let i = 0; i < this.props.cards.length; i++) {
            cardAllowed = skCards.isCardAllowed(this.props.cards[i], this.props.cards, this.props.playedCards);
            let cardImage = skCards.getCardImage(this.props.cards[i]);
            cards.push(
                <div
                    key={i}
                    className={'card ' + (cardAllowed && activeTurn ? 'cardAllowed' : '')}
                    onClick={() => this.selectCard(i)}
                >
                    <img src={process.env.REACT_APP_IMAGE_HOST + '/cards/' + cardImage + '.png'} alt='card#'/>
                </div>
            );
        }

        return (
            <div className="playerCardsWindow">
                <h3>Yer Cards{activeTurn ? ' and it be yer turn!' : ''}:</h3>
                {tigresWindow}
                <div className={"playerCardsWindow-cards " + this.getNumber() }>
                    {cards}
                </div>
            </div>
        )
    }
}

export default PlayerCardsWindow;