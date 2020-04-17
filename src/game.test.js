import * as skCards from "./cardDeck";

const G = {
    board: [],
};

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