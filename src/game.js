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

function ResetHands(ctx) {
    return Array(ctx.numPlayers).fill(null).map(x =>( Array(0) ));
}

function DrawCard(G, ctx, player) {
    G.hand[player].push(G.cards.shift())
}

const SkullKing = {
    name: 'Skull-King',

    setup: (ctx) => ({ 
        round: 3,
        cards: SkullKingDeck(),
        hand: ResetHands(ctx),
        board: [],
    }),

    turn: { moveLimit: 1 },

    phases: {
        deal: {
            start: true,
            
            onBegin: (G, ctx) => {
                G.hand = ResetHands(ctx);
                G.cards = ctx.random.Shuffle(G.cards);
                G.board = [];

                for (let r = 0; r < G.round; r++) {
                    for (let i = 0; i < ctx.numPlayers; i++) {
                        DrawCard(G, ctx, i);
                    }
                }

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
                    G.board.push(G.hand[ctx.currentPlayer][card]);
                    G.hand[ctx.currentPlayer].splice(card, 1);
                }
            }
        },

    },

    endIf: (G, ctx) => {

    },
};

export default SkullKing;