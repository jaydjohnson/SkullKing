import React from 'react';
import PropTypes from 'prop-types';
import './board.css';
import BidWindow from './bidWindow.js';
import PlayerWindow from './playerWindow';
import PlayerHandWindow from './playerHandWindow';

class SkullKingBoard extends React.Component {
    static propTypes = {
        G: PropTypes.any.isRequired,
        ctx: PropTypes.any.isRequired,
        moves: PropTypes.any.isRequired,
        playerID: PropTypes.string,
        isActive: PropTypes.bool,
        isMultiplayer: PropTypes.bool,
    }

    endHand = () => {
        console.log('end?');
        this.ctx.events.endStage();
    }

    handleSelectCard = card => {
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

        let bidWindow = '';
        if (this.props.G.bidding) {
            bidWindow = (
            <BidWindow
                round={this.props.G.round}
                player={this.props.playerID} 
                onClick={this.handleBidClick}
            />);
        }

        let playerHandWindow = (
            <PlayerHandWindow
                cards={this.props.G.players[this.props.playerID].hand}
                playedCards={this.props.G.board}
                bidding={this.props.G.bidding}
                isActive={this.props.ctx.currentPlayer === this.props.playerID}
                onSelectCard={this.handleSelectCard}
            />
        )
        let playerWindow = (
            <PlayerWindow
                players={this.props.G.players}
                bidding={this.props.G.bidding}
                activePlayer={this.props.ctx.currentPlayer}
                nextPlayer={this.props.G.startingRoundPlayer}
                currentRound={this.props.G.round}
                scores={this.props.G.scores}
            />
        );

        let readyButton = this.props.ctx.phase === 'endHand' && this.props.ctx.currentPlayer === this.props.playerID ? (<button onClick={this.endRound}>End Hand</button>) : '';
        return (
            <div id="gameWindow">
                <div className="leftColumn">
                    {playerWindow}
                </div>
                <div className="rightColumn">
                    <div id="board">
                        {playedCardsList}
                    </div> 
                    {readyButton}
                    <div className="bidWindow">
                        {bidWindow}
                    </div>
                    <div className="playerCardsWindow">
                        {playerHandWindow}
                    </div>
                </div>
            </div>
        );
    }
}

export default SkullKingBoard;
