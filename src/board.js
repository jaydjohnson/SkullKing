import React from 'react';
import PropTypes from 'prop-types';
import './board.css';
import BidWindow from './bidWindow.js';
import PlayerWindow from './playerWindow';
import PlayerHandWindow from './playerHandWindow';
import TigresWindow from './tigresWindow';
import * as skCards from "./cardDeck";

class SkullKingBoard extends React.Component {
    static propTypes = {
        G: PropTypes.any.isRequired,
        ctx: PropTypes.any.isRequired,
        moves: PropTypes.any.isRequired,
        playerID: PropTypes.string,
        isActive: PropTypes.bool,
        isMultiplayer: PropTypes.bool,
    }

    endHand() {
        console.log('end?', this.props.playerID);
        this.props.moves.confirmReady();
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

    handleSelectTigres = value => {
        this.props.moves.selectTigres(value);
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

        let playedCardsList = (<div id="playedCards"><div className="playedCards-list">{playedCards}</div></div>);

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

        let tigresWindow = this.props.ctx.phase === 'selectTigres' && this.props.ctx.currentPlayer === this.props.playerID ? (
            <TigresWindow
                player={this.props.ctx.currentPlayer}
                onClick={this.handleSelectTigres}
            />
        ) : '';

        let winnerMessage = '';
        if (this.props.ctx.phase === 'endHand') {
            let winnerIndex = skCards.getWinner(this.props.G.board);
            let winner = this.props.G.board[winnerIndex].player;
            winnerMessage = this.props.ctx.phase === 'endHand' ? this.props.G.players[winner].name + ' won this hand!' + (this.props.G.players[winner].roundBonus ? '  And got bonus points!' : '') : '';            
        }
        let readyButton = this.props.ctx.phase === 'endHand' && this.props.ctx.currentPlayer === this.props.playerID ? (<button onClick={() => this.endHand()}>End Hand</button>) : '';
        return (
            <div id="gameWindow">
                <div className="leftColumn">
                    {playerWindow}
                </div>
                <div className="rightColumn">
                    <div id="board">
                        <h3>Played Cards:</h3>
                        {winnerMessage}
                        {playedCardsList}
                        {readyButton}
                    </div> 
                    <div className="bidWindow">
                        {bidWindow}
                        {tigresWindow}
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
