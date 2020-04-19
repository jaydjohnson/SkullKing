import React from 'react';

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
            this.props.moves.chooseCard(card);
        }
    }

    render() {

        let cards = [];
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

        let playerHandList = (<div id="playerCards" className={this.props.isActive && !this.props.G.bidding ? 'active-turn' : ''}><h3>Your Cards:</h3><div className="playerCards-list">{cards}</div></div>);


        return (
            <div className="playerHand">
                {playerHandList}
            </div>
        )
    }
}

export default PlayerHandWindow;