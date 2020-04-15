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
    }
}

function DrawCard(G, ctx, player) {
    G.players[player].hand.push(G.cards.shift())
}

const SkullKing = {
    name: 'Skull-King',

    setup: () => ({ 
        round: 10,
        cards: SkullKingDeck(),
        players: [],
        board: [],
    }),

    turn: { moveLimit: 1 },

    phases: {
        start: {


            onBegin: (G, ctx) => {
                for (let i = 0; i < ctx.numPlayers; i++) {
                    G.players[i] = {
                        hand: [],
                        score: 0,
                        name: 'Bob-' + i,
                    };
                }

                ctx.events.endPhase();
            },

            next: 'deal',
        },

        deal: {
            start: true,

            onBegin: (G, ctx) => {
                for (let i = 0; i < ctx.numPlayers; i++) {
                    G.players[i] = {
                        hand: [],
                        score: 0,
                        name: 'Bob-' + i,
                    };
                }

                ResetHands(G, ctx);
                G.cards = ctx.random.Shuffle(G.cards);
                G.board = [];

                for (let r = 0; r < G.round; r++) {
                    for (let i = 0; i < ctx.numPlayers; i++) {
                        DrawCard(G, ctx, i);
                    }
                }

                G.bidding = true;
                ctx.events.endPhase();
            },

            next: 'play',
        },

        bid: {
            onBegin: (G, ctx) => {
                
            },

            moves: {
                selectBidAmount: (G, ctx, id) => {

                }
            }
        },

        play: {
            moves: {
                chooseCard(G, ctx, card) {
                    G.board.push({card: G.players[ctx.currentPlayer].hand[card], player: G.players[ctx.currentPlayer].name});
                    G.players[ctx.currentPlayer].hand.splice(card, 1);
                },

                selectBid(G, ctx, bid) {
                    console.log('seleceted', bid);
                }
            }
        },

    },

    endIf: (G, ctx) => {

    },
};

export default SkullKing;