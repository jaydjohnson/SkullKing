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

export const SkullKing = {
    name: 'SkullKing',

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
                for (let i = 0; i < ctx.numPlayers; i++) {
                    let name = 'Jay-' + (i + 1);
                    G.players[i] = {
                        hand: [],
                        score: 0,
                        roundBonus: 0,
                        tricks: 0,
                        playerIndex: i,
                        currentBid: null,
                        name: name.substring(0, 6),
                        longName: name,
                    };
                }

                G.round = 0;

                ctx.events.endPhase();
            },

            next: 'deal',
        },

        deal: {
            onEnd: (G, ctx) => {
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
                G.roundHand++;
                G.board = [];
                G.bidding = false;
                G.ready = false;
            },

            endIf: (G, ctx) => {
                if ( G.roundHand > G.round) {
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
                let winnerIndex = skCards.getWinner(G.board);
                let winner = G.board[winnerIndex].player;
                G.startingRoundPlayer = winner;
                G.players[winner].tricks++;
                // Give Winner any bonuses
                if ( G.players[winner].currentBid > 0) {
                    G.players[winner].roundBonus += scores.getRoundBonus(winner, G.board);
                }
                if ( G.roundHand === G.round) {
                    // Score 
                    G.players = scores.getRoundScores(G.players, G.round);
                    G.scores.push(G.players);
                }
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
        if (G.round > 10) {
            return true;
        }
    },
};
