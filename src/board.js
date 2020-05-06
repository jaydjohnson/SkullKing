import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './board.scss';
import BidWindow from './bidWindow.js';
import ScoreBoardWindow from './scoreBoardWindow';
import PlayerCardsWindow from './playerCardsWindow';
import * as skCards from "./cardDeck";
import * as scoring from "./scoring";
import PlayedCardsWindow from './playedCardsWindow';
import HelpCard from './helperCard';

export class SkullKingBoard extends React.Component {
    static propTypes = {
        G: PropTypes.any.isRequired,
        ctx: PropTypes.any.isRequired,
        moves: PropTypes.any.isRequired,
        playerID: PropTypes.string,
        isActive: PropTypes.bool,
        isMultiplayer: PropTypes.bool,
        gameMetadata: PropTypes.any.isRequired,
    }

    endHand() {
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

    getScores = () => {
        let sortedWinners = this.props.G.players.sort((a, b) => {
            return b.score - a.score;
        });
        let winners = sortedWinners.map((winner, i) => {
            return (<li key={i}>{this.props.gameMetadata[winner.playerIndex].name} - {winner.score} </li>);
        })
        return (<ul>{winners}</ul>);
    }

    render() {
        let playedCardsWindow = (
            <PlayedCardsWindow
                cards={this.props.G.board}
                players={this.props.G.players}
                playerNames={this.props.gameMetadata}
                phase={this.props.ctx.phase}
            />
        );

        let bidWindow = '';
        if (this.props.G.bidding) {
            bidWindow = (
            <BidWindow
                round={this.props.G.round}
                player={this.props.playerID}
                    startingPlayer={this.props.G.startingRoundPlayer === parseInt(this.props.playerID) ? 'You' : this.props.gameMetadata[this.props.G.startingRoundPlayer].name}
                onClick={this.handleBidClick}
            />);
        }

        let playerCardsWindow = (
            <PlayerCardsWindow
                cards={this.props.G.players[this.props.playerID].hand}
                playedCards={this.props.G.board}
                bidding={this.props.G.bidding}
                isActive={this.props.ctx.currentPlayer === this.props.playerID}
                onSelectCard={this.handleSelectCard}
                phase={this.props.ctx.phase}
            />
        );

        let scoreBoardWindow = (
            <ScoreBoardWindow
                players={this.props.G.players}
                playerNames={this.props.gameMetadata}
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
            let roundBonus = 0;
            if (this.props.G.players[winner].currentBid > 0) {
                roundBonus = scoring.getRoundBonus(winner, this.props.G.board);
            }
            winnerMessage = this.props.ctx.phase === 'endHand' ? this.props.gameMetadata[winner].name + ' won this hand!' + (roundBonus > 0 ? ' And got ' + roundBonus + ' bonus points!' : '') : '';            
        }
        let readyButton = this.props.ctx.phase === 'endHand' && this.props.ctx.currentPlayer === this.props.playerID ? (<button onClick={() => this.endHand()}>End Hand</button>) : '';

        let playerNames = [];
        this.props.gameMetadata.filter((player, i) => {
            return playerNames.push(<span key={i}>{'player' + player.name}</span>);
        });
        return (
            <div id="gameWindow">
                <div className="header">
                    <h1>Skull King </h1>
                    <div className="header-info">
                        Round: {this.props.G.round}<br />
                        Dealer: {this.props.gameMetadata[this.props.G.dealer].name}
                    </div>
                </div>
                <div className="gameContent">
                    {this.props.ctx.gameover ? 
                    (
                        <div className="leftColumn">
                            <div className="winnerWindow">
                                <h2>Game Over</h2>
                                {this.getScores()}
                                    <Link to="/"><button>Back to Home</button></Link>
                            </div>
                        </div>
                    ) : (
                        <div className="leftColumn">
                            <div id="board">
                                <h1>{ winnerMessage }</h1>
                                {playedCardsWindow}
                                {readyButton}
                            </div>
                            { bidWindow }
                            { playerCardsWindow }
                        </div >   
                    )}
                    <div className="rightColumn">
                        {scoreBoardWindow}
                        <div className="gameActions">
                            <HelpCard />
                            <Link to="/"><button title="Leave Game" onClick={this.handleLeaveGameClick}>Abandom Ship</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SkullKingBoard;
