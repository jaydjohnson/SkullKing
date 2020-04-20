import * as skCards from "./cardDeck";

const G = {
    board: [],
};
let playerHand = [];

it('Player 1 Wins: Same Suit', () => {
    // Set up delt cards
    G.board =  [ 
            { card: { value: 10, color: 'yellow' }, player: 'Player 1' },
            { card: { value: 3, color: 'yellow' }, player: 'Player 2' },
            { card: { value: 1, color: 'yellow' }, player: 'Player 3' },
            { card: { value: 6, color: 'yellow' }, player: 'Player 4' },
        ];

    let winner = skCards.getWinner(G.board);
    expect(winner).toEqual(0);
});

it('Player 1 Wins: Sets Suit, Other Suits played', () => {
    G.board = [
        { card: { value: 5, color: 'yellow' }, player: 'Player 1' },
        { card: { value: 3, color: 'yellow' }, player: 'Player 2' },
        { card: { value: 10, color: 'green' }, player: 'Player 3' },
        { card: { value: 4, color: 'green' }, player: 'Player 4' },
    ];

    let winner = skCards.getWinner(G.board);
    expect(winner).toEqual(0);
});

it('Player 3 Wins: Suit set by 1, Other Suits played', () => {
    G.board = [
        { card: { value: 5, color: 'green' }, player: 'Player 1' },
        { card: { value: 3, color: 'yellow' }, player: 'Player 2' },
        { card: { value: 10, color: 'green' }, player: 'Player 3' },
        { card: { value: 4, color: 'green' }, player: 'Player 4' },
    ];

    let winner = skCards.getWinner(G.board);
    expect(winner).toEqual(2);
});

it('Player 2 Wins: Suit set by 1, Player 2 plays Black', () => {
    G.board = [
        { card: { value: 5, color: 'green' }, player: 'Player 1' },
        { card: { value: 3, color: 'black' }, player: 'Player 2' },
        { card: { value: 10, color: 'green' }, player: 'Player 3' },
        { card: { value: 4, color: 'green' }, player: 'Player 4' },
    ];

    let winner = skCards.getWinner(G.board);
    expect(winner).toEqual(1);
});

it('Player 4 Wins: Suit set by 1, Player 2 plays Black, Player 4 beats 2', () => {
    G.board = [
        { card: { value: 5, color: 'green' }, player: 'Player 1' },
        { card: { value: 3, color: 'black' }, player: 'Player 2' },
        { card: { value: 10, color: 'green' }, player: 'Player 3' },
        { card: { value: 4, color: 'black' }, player: 'Player 4' },
    ];

    let winner = skCards.getWinner(G.board);
    expect(winner).toEqual(3);
});

it('Player 4 Wins: Suit set by 1, Player 2 plays Black, Player 4 plays black', () => {
    G.board = [
        { card: { value: 5, color: 'green' }, player: 'Player 1' },
        { card: { value: 13, color: 'black' }, player: 'Player 2' },
        { card: { value: 10, color: 'green' }, player: 'Player 3' },
        { card: { value: 4, color: 'black' }, player: 'Player 4' },
    ];

    let winner = skCards.getWinner(G.board);
    expect(winner).toEqual(1);
});

it('Player 3 Wins: Suit set by 1, Player 2 plays Black, Player 3 plays Pirate', () => {
    G.board = [
        { card: { value: 5, color: 'green' }, player: 'Player 1' },
        { card: { value: 3, color: 'black' }, player: 'Player 2' },
        { card: { value: 20, color: 'red' }, player: 'Player 3' },
        { card: { value: 4, color: 'black' }, player: 'Player 4' },
    ];

    let winner = skCards.getWinner(G.board);
    expect(winner).toEqual(2);
});

it('Player 3 Wins: 2 Pirate cards played', () => {
    G.board = [
        { card: { value: 5, color: 'green' }, player: 'Player 1' },
        { card: { value: 3, color: 'black' }, player: 'Player 2' },
        { card: { value: 20, color: 'red' }, player: 'Player 3' },
        { card: { value: 20, color: 'red' }, player: 'Player 4' },
    ];

    let winner = skCards.getWinner(G.board);
    expect(winner).toEqual(2);
});

it('Player 4 Wins: Skull King card played', () => {
    G.board = [
        { card: { value: 5, color: 'green' }, player: 'Player 1' },
        { card: { value: 3, color: 'black' }, player: 'Player 2' },
        { card: { value: 20, color: 'red' }, player: 'Player 3' },
        { card: { value: 25, color: 'skullking' }, player: 'Player 4' },
    ];

    let winner = skCards.getWinner(G.board);
    expect(winner).toEqual(3);
});

it('Player 3 Wins: Player 2 plays Surrender card', () => {
    G.board = [
        { card: { value: 5, color: 'green' }, player: 'Player 1' },
        { card: { value: 3, color: 'black' }, player: 'Player 2' },
        { card: { value: 0, color: 'white' }, player: 'Player 3' },
        { card: { value: 20, color: 'red' }, player: 'Player 4' },
    ];

    let winner = skCards.getWinner(G.board);
    expect(winner).toEqual(3);
});

it('Player 2 Wins: Suit set by player 2', () => {
    G.board = [
        { card: { value: 0, color: 'white' }, player: 'Player 1' },
        { card: { value: 14, color: 'purple' }, player: 'Player 2' },
        { card: { value: 4, color: 'yellow' }, player: 'Player 3' },
        { card: { value: 10, color: 'purple' }, player: 'Player 4' },
    ];

    let winner = skCards.getWinner(G.board);
    expect(winner).toEqual(1);
});

it('Player 1 Wins: Everyone Passes', () => {
    G.board = [
        { card: { value: 0, color: 'white' }, player: 'Player 1' },
        { card: { value: 0, color: 'white' }, player: 'Player 2' },
        { card: { value: 0, color: 'white' }, player: 'Player 3' },
        { card: { value: 0, color: 'white' }, player: 'Player 4' },
    ];

    let winner = skCards.getWinner(G.board);
    expect(winner).toEqual(0);
});

it('Suit is green', () => {
    G.board = [
        { card: { value: 4, color: 'green' }, player: 'Player 1' },
        { card: { value: 5, color: 'green' }, player: 'Player 2' },
        { card: { value: 1, color: 'black' }, player: 'Player 3' },
        { card: { value: 2, color: 'yellow' }, player: 'Player 4' },
    ];

    let suit = skCards.getCurrentSuit(G.board);
    expect(suit).toEqual('green');
});

it('Suit is yellow', () => {
    G.board = [
        { card: { value: 0, color: 'white' }, player: 'Player 1' },
        { card: { value: 5, color: 'yellow' }, player: 'Player 2' },
        { card: { value: 1, color: 'black' }, player: 'Player 3' },
        { card: { value: 2, color: 'yellow' }, player: 'Player 4' },
    ];

    let suit = skCards.getCurrentSuit(G.board);
    expect(suit).toEqual('yellow');
});

it('Suit is black', () => {
    G.board = [
        { card: { value: 10, color: 'black' }, player: 'Player 1' },
        { card: { value: 5, color: 'yellow' }, player: 'Player 2' },
        { card: { value: 1, color: 'black' }, player: 'Player 3' },
        { card: { value: 2, color: 'yellow' }, player: 'Player 4' },
    ];

    let suit = skCards.getCurrentSuit(G.board);
    expect(suit).toEqual('black');
});

it('Suit is none', () => {
    G.board = [
        { card: { value: 20, color: 'red' }, player: 'Player 1' },
        { card: { value: 5, color: 'yellow' }, player: 'Player 2' },
        { card: { value: 1, color: 'black' }, player: 'Player 3' },
        { card: { value: 2, color: 'yellow' }, player: 'Player 4' },
    ];

    let suit = skCards.getCurrentSuit(G.board);
    expect(suit).toEqual('none');
});

it('Suit set, has suit', () => {
    G.board = [
        { card: { value: 5, color: 'green' }, player: 'Player 1' },
        { card: { value: 3, color: 'yellow' }, player: 'Player 2' },
    ];

    playerHand = [
        { value: 6, color: 'purple' },
        { value: 3, color: 'green' },
        { value: 9, color: 'black' },
        { value: 0, color: 'white' },
    ]

    let card1 = skCards.isCardAllowed(playerHand[0], playerHand, G.board);
    let card2 = skCards.isCardAllowed(playerHand[1], playerHand, G.board);
    let card3 = skCards.isCardAllowed(playerHand[2], playerHand, G.board);
    let card4 = skCards.isCardAllowed(playerHand[3], playerHand, G.board);
    expect(card1).toEqual(false);
    expect(card2).toEqual(true);
    expect(card3).toEqual(false);
    expect(card4).toEqual(true);
});

it('Suit set, doesnt have suit', () => {
    G.board = [
        { card: { value: 5, color: 'green' }, player: 'Player 1' },
        { card: { value: 3, color: 'yellow' }, player: 'Player 2' },
    ];

    playerHand = [
        { value: 6, color: 'purple' },
        { value: 3, color: 'yellow' },
        { value: 9, color: 'black' },
        { value: 0, color: 'white' },
    ]

    let card1 = skCards.isCardAllowed(playerHand[0], playerHand, G.board);
    let card2 = skCards.isCardAllowed(playerHand[1], playerHand, G.board);
    let card3 = skCards.isCardAllowed(playerHand[2], playerHand, G.board);
    let card4 = skCards.isCardAllowed(playerHand[3], playerHand, G.board);
    expect(card1).toEqual(true);
    expect(card2).toEqual(true);
    expect(card3).toEqual(true);
    expect(card4).toEqual(true);
});

it('Suit black, has black', () => {
    G.board = [
        { card: { value: 5, color: 'black' }, player: 'Player 1' },
        { card: { value: 3, color: 'yellow' }, player: 'Player 2' },
    ];

    playerHand = [
        { value: 6, color: 'purple' },
        { value: 3, color: 'yellow' },
        { value: 9, color: 'black' },
        { value: 0, color: 'white' },
    ]

    let card1 = skCards.isCardAllowed(playerHand[0], playerHand, G.board);
    let card2 = skCards.isCardAllowed(playerHand[1], playerHand, G.board);
    let card3 = skCards.isCardAllowed(playerHand[2], playerHand, G.board);
    let card4 = skCards.isCardAllowed(playerHand[3], playerHand, G.board);
    expect(card1).toEqual(false);
    expect(card2).toEqual(false);
    expect(card3).toEqual(true);
    expect(card4).toEqual(true);
});

it('Suit black, doesnt have black', () => {
    G.board = [
        { card: { value: 5, color: 'black' }, player: 'Player 1' },
        { card: { value: 3, color: 'yellow' }, player: 'Player 2' },
    ];

    playerHand = [
        { value: 6, color: 'purple' },
        { value: 3, color: 'yellow' },
        { value: 9, color: 'green' },
        { value: 0, color: 'white' },
    ]

    let card1 = skCards.isCardAllowed(playerHand[0], playerHand, G.board);
    let card2 = skCards.isCardAllowed(playerHand[1], playerHand, G.board);
    let card3 = skCards.isCardAllowed(playerHand[2], playerHand, G.board);
    let card4 = skCards.isCardAllowed(playerHand[3], playerHand, G.board);
    expect(card1).toEqual(true);
    expect(card2).toEqual(true);
    expect(card3).toEqual(true);
    expect(card4).toEqual(true);
});

it('Pirate Led', () => {
    G.board = [
        { card: { value: 20, color: 'red' }, player: 'Player 1' },
        { card: { value: 3, color: 'yellow' }, player: 'Player 2' },
    ];

    playerHand = [
        { value: 6, color: 'purple' },
        { value: 20, color: 'red' },
        { value: 9, color: 'black' },
        { value: 0, color: 'white' },
    ]

    let card1 = skCards.isCardAllowed(playerHand[0], playerHand, G.board);
    let card2 = skCards.isCardAllowed(playerHand[1], playerHand, G.board);
    let card3 = skCards.isCardAllowed(playerHand[2], playerHand, G.board);
    let card4 = skCards.isCardAllowed(playerHand[3], playerHand, G.board);
    expect(card1).toEqual(true);
    expect(card2).toEqual(true);
    expect(card3).toEqual(true);
    expect(card4).toEqual(true);
});