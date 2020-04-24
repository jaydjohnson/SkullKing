import React from 'react';
import PropTypes from 'prop-types';
import './board.scss';
import BidWindow from './bidWindow.js';
import ScoreBoardWindow from './scoreBoardWindow';
import PlayerHandWindow from './playerHandWindow';
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

    handleSelectCard = (card, tigresValue )=> {
        this.props.moves.chooseCard(card, tigresValue);
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
                        {this.props.G.players[this.props.G.board[i].player].name}
                    </div>
                </div>
            )
        }

        let playedCardsList = this.props.ctx.phase === 'bid' ? '' : (<div id="playedCards"><h2>Played Cards:</h2><div className="playedCards-list">{playedCards}</div></div>);

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
                phase={this.props.ctx.phase}
            />
        )
        let scoreBoardWindow = (
            <ScoreBoardWindow
                players={this.props.G.players}
                bidding={this.props.G.bidding}
                activePlayer={this.props.ctx.currentPlayer}
                nextPlayer={this.props.G.startingRoundPlayer}
                currentRound={this.props.G.round}
                scores={this.props.G.scores}
                phase={this.props.ctx.phase}
            />
        );

        let winnerMessage = '';
        if (this.props.ctx.phase === 'endHand') {
            let winnerIndex = skCards.getWinner(this.props.G.board);
            let winner = this.props.G.board[winnerIndex].player;
            winnerMessage = this.props.ctx.phase === 'endHand' ? this.props.G.players[winner].name + ' won this hand!' + (this.props.G.players[winner].roundBonus ? ' And got bonus points!' : '') : '';            
        }
        let readyButton = this.props.ctx.phase === 'endHand' && this.props.ctx.currentPlayer === this.props.playerID ? (<button onClick={() => this.endHand()}>End Hand</button>) : '';
        return (
            <div id="gameWindow">
                <div className="header">
                    <h1>Skull King</h1>
                    <div className="header-info">
                        Round: {this.props.G.round}<br />
                        Current Player: {this.props.G.players[this.props.ctx.currentPlayer].longName}
                    </div>
                </div>
                <div className="gameContent">
                    <div className="leftColumn">
                        {scoreBoardWindow}
                    </div>
                    <div className="rightColumn">
                        <div id="board">
                            <h1>{winnerMessage}</h1>
                            {playedCardsList}
                            {readyButton}
                        </div>
                        {bidWindow}
                        <div className="playerCardsWindow">
                            {playerHandWindow}
                        </div>
                    </div>                    
                </div>
            </div>
        );
    }
}

export default SkullKingBoard;
