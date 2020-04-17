import { TurnOrder } from "boardgame.io/core";

function SkullKingDeck() {
    return [
        '1-Yellow',
        '2-Yellow',
        '3-Yellow',
        '4-Yellow',
        '5-Yellow',
        '6-Yellow',
        '7-Yellow',
        '8-Yellow',
        '9-Yellow',
        '10-Yellow',
        '11-Yellow',
        '12-Yellow',
        '13-Yellow',
        '14-Yellow',
        '1-Blue',
        '2-Blue',
        '3-Blue',
        '4-Blue',
        '5-Blue',
        '6-Blue',
        '7-Blue',
        '8-Blue',
        '9-Blue',
        '10-Blue',
        '11-Blue',
        '12-Blue',
        '13-Blue',
        '14-Blue',
    ];
}

function ResetHands(G, ctx) {
    for (let i = 0; i < ctx.numPlayers; i++) {
        G.players[i].hand = [];
        G.players[i].currentBid = null;
    }
}

function DrawCard(G, ctx, player) {
    G.players[player].hand.push(G.cards.shift())
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

const SkullKing = {
    name: 'Skull-King',

    setup: (ctx) => ({ 
        round: 0,
        roundHand: 0,
        cards: SkullKingDeck(),
        players: [],
        board: [],
        startingPlayer: ctx.random.Die(ctx.numPlayers)-1,
    }),

    turn: { 
        moveLimit: 1,

        order: TurnOrder.ONCE,

        stages: {
            bidding: {
                moves: {
                    selectBidAmount: (G, ctx, bid) => {
                        G.players[ctx.playerID].currentBid = bid;
                    }
                }
            },
        },
    },

    moves: {
        chooseCard(G, ctx, card) {
            G.board.push({card: G.players[ctx.currentPlayer].hand[card], player: G.players[ctx.currentPlayer].name});
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
                        name: 'Bob-' + i,
                        currentBid: null,
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
                G.cards = Shuffle(G.cards);
                G.board = [];
                G.round++;
                G.roundHand = 0;

                for (let r = 0; r < G.round; r++) {
                    for (let i = 0; i < ctx.numPlayers; i++) {
                        DrawCard(G, ctx, i);
                    }
                }

                G.bidding = true;
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
            },

            onEnd: (G, ctx) => {
                // Pass to winner of last hand
                console.log('Taking Trick', ctx.numPlayers);
                G.startingPlayer = getRndInteger(0, ctx.numPlayers-1);
                console.log('player ', G.startingPlayer, ' won');
            },

            endIf: (G, ctx) => {
                if ( G.roundHand > G.round) {
                    console.log('Ending Play');
                    ctx.events.setPhase('deal');
                }
            },

            next: 'play',

            turn: {
                moveLimit: 1,

                order: {
                    first: (G, ctx) => G.startingPlayer,
                    next: (G, ctx) => {
                        if (parseInt(ctx.currentPlayer) === (G.startingPlayer + ctx.numPlayers - 1) % ctx.numPlayers) {
                            return undefined;
                        }
                        return (ctx.playOrderPos + 1) % ctx.numPlayers;
                    },
                    playOrder: (G, ctx) => ['0', '1', '2', '3'],
                }
            }
        },

    },

    endIf: (G, ctx) => {

    },
};

export default SkullKing;