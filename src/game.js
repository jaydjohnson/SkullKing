import { TurnOrder } from "boardgame.io/core";
import * as skCards from "./cardDeck";
import * as scores from "./scoring";

function ResetHands(G, ctx) {
    for (let i = 0; i < ctx.numPlayers; i++) {
        G.players[i].hand = [];
        G.players[i].currentBid = null;
        G.players[i].roundBonus = 0;
        G.players[i].tricks = 0;
    }
}

function DrawCard(G, ctx, player, deck) {
    G.players[player].hand.push(deck.shift())
}

const SkullKing = {
    name: 'Skull-King',

    setup: (ctx) => ({ 
        round: 0,
        roundHand: 0,
        bidding: false,
        dealer: ctx.random.Die(ctx.numPlayers)-1,
        startingRoundPlayer: 0,
        board: [],
        players: [],
        scores: [],
        ready: false,
    }),

    moves: {
        chooseCard(G, ctx, card, tigresValue) {
            if (tigresValue) {
                if (tigresValue === 1) {
                    G.players[ctx.currentPlayer].hand[card].value = 0;
                    G.players[ctx.currentPlayer].hand[card].color = 'white';
                } else {
                    G.players[ctx.currentPlayer].hand[card].value = 20;
                    G.players[ctx.currentPlayer].hand[card].color = 'red';
                }
            }
            G.board.push({card: G.players[ctx.currentPlayer].hand[card], player: G.players[ctx.currentPlayer].playerIndex});
            G.players[ctx.currentPlayer].hand.splice(card, 1);
        },
    },

    phases: {
        startGame: {
            start: true,

            onBegin: (G, ctx) => {
                console.log('Starting Game');

                for (let i = 0; i < ctx.numPlayers; i++) {
                    G.players[i] = {
                        hand: [],
                        score: 0,
                        roundBonus: 0,
                        tricks: 0,
                        playerIndex: i,
                        currentBid: null,
                        name: 'Bob-' + (i+1),
                    };
                }

                G.round = 0;

                ctx.events.endPhase();
            },

            next: 'deal',
        },

        deal: {
            onEnd: (G, ctx) => {
                console.log('dealing cards');

                ResetHands(G, ctx);
                let deck = skCards.ShuffledSkullKingDeck();
                G.board = [];
                G.round++;
                G.roundHand = 0;
                for (let r = 0; r < G.round; r++) {
                    for (let i = 0; i < ctx.numPlayers; i++) {
                        DrawCard(G, ctx, i, deck);
                    }
                }
                for (let i = 0; i < ctx.numPlayers; i++) {
                    G.players[i].hand = skCards.sortHand(G.players[i].hand);
                }
                G.bidding = true;
                G.dealer = (G.dealer + 1) % ctx.numPlayers;
                G.startingRoundPlayer = (G.dealer + 1) % ctx.numPlayers
            },

            endIf: (G, ctx) => true,

            next: 'bid',
        },

        bid: {
            onBegin: (G, ctx) => {
                console.log('bidding');
            },

            endIf: (G, ctx) => {
                let stillBidding = G.players.filter(function (p) {
                    return p.currentBid === null;
                });
                if (! stillBidding.length) {
                    ctx.events.endPhase();
                }
            },

            next: 'play',

            turn: {
                order: TurnOrder.ONCE,

                activePlayers: { all: 'bidding', moveLimit: 1}
            },

            moves: {
                selectBidAmount: (G, ctx, bid) => {
                    G.players[ctx.playerID].currentBid = bid;
                }
            },
        },

        play: {
            onBegin: (G, ctx) => {
                console.log('Enter: play');
                G.roundHand++;
                G.board = [];
                G.bidding = false;
                G.ready = false;
            },

            endIf: (G, ctx) => {
                if ( G.roundHand > G.round) {
                    console.log('Ending RoundIf');
                    return { next: 'deal' }
                }
            },

            next: 'endHand',

            turn: {
                moveLimit: 1,

                order: {
                    first: (G, ctx) => G.startingRoundPlayer,
                    next: (G, ctx) => {
                        if (parseInt(ctx.currentPlayer) === (G.startingRoundPlayer + ctx.numPlayers - 1) % ctx.numPlayers) {
                            ctx.events.endPhase()
                        }
                        return (ctx.playOrderPos + 1) % ctx.numPlayers;
                    },
                }
            }
        },

        endHand: {
            onBegin: (G, ctx) => {
                console.log('endHand');
                let winnerIndex = skCards.getWinner(G.board);
                let winner = G.board[winnerIndex].player;
                G.startingRoundPlayer = winner;
                G.players[winner].tricks++;
                // Give Winner any bonuses
                if ( G.players[winner].currentBid > 0) {
                    G.players[winner].roundBonus += scores.getRoundBonus(winner, G.board);
                }
                G.board.map((card) => console.log(card.card.value, card.card.color));
                G.players.map((player) => console.log(player.name, player.roundBonus));
                console.log('player ', G.players[winner].name, ' won');
                if ( G.roundHand === G.round) {
                    console.log('Ending Round: onEnd');
                    // Score 
                    console.log( scores.getRoundScoresOnly(G.players, G.round) );
                    G.players = scores.getRoundScores(G.players, G.round);
                    G.scores.push(G.players);
                }
                console.log('Setting ENDING HAND!?!??!');
            },

            endIf: (G, ctx) => {
                if ( G.ready ) {
                    return G.roundHand > G.round ? { next: 'deal' } : { next: 'play' }
                }
            },

            next: 'deal',

            turn: {
                order: TurnOrder.ONCE,

                activePlayers: { currentPlayer: 'endingHand', moveLimit: 1, revert: true },

                stages: {
                    endingHand: {
                        moves: {
                            confirmReady: (G, ctx) => {
                                G.ready = true;
                            }
                        }
                    }
                },
            },
        },

    },

    endIf: (G, ctx) => {

    },
};

export default SkullKing;