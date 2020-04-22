import * as scoring from "./scoring";

const G = {
    players: [],
    board: [],
    round: 1,
};

it('Check Round Bonus: Bid 1 and Bid 0', () => {
    // Set up delt cards
    G.board =  [ 
            { card: { value: 10, color: 'yellow' }, player: 0, name: 'Player 1' },
            { card: { value: 3, color: 'yellow' }, player: 1, name: 'Player 2' },
            { card: { value: 1, color: 'yellow' }, player: 2, name: 'Player 3' },
            { card: { value: 6, color: 'yellow' }, player: 3, name: 'Player 4' },
        ];
    G.players = [
        { currentBid: 1, tricks: 1, score: 0, roundBonus: 0 },
        { currentBid: 0, tricks: 1, score: 0, roundBonus: 0 },
        { currentBid: 0, tricks: 1, score: 0, roundBonus: 0 },
        { currentBid: 0, tricks: 1, score: 0, roundBonus: 0 },
    ]

    let player1roundBonus = scoring.getRoundBonus(0, G.board);
    let player2roundBonus = scoring.getRoundBonus(1, G.board);
    expect(player1roundBonus).toEqual(0);
    expect(player2roundBonus).toEqual(0);
});

it('Check Round Bonus: Capture 14', () => {
    // Set up delt cards
    G.board =  [ 
            { card: { value: 14, color: 'yellow' }, player: 0, name: 'Player 1' },
            { card: { value: 3, color: 'yellow' }, player: 1, name: 'Player 2' },
            { card: { value: 4, color: 'black' }, player: 2, name: 'Player 3' },
            { card: { value: 14, color: 'green' }, player: 3, name: 'Player 4' },
        ];
    G.players = [
        { currentBid: 1, tricks: 1, score: 0, roundBonus: 0 },
        { currentBid: 0, tricks: 1, score: 0, roundBonus: 0 },
        { currentBid: 1, tricks: 1, score: 0, roundBonus: 0 },
        { currentBid: 0, tricks: 1, score: 0, roundBonus: 0 },
    ]

    let playerroundBonus = scoring.getRoundBonus(2, G.board);
    expect(playerroundBonus).toEqual(10);
});

it('Check Round Bonus: Capture Jolly Rodger 14', () => {
    // Set up delt cards
    G.board =  [ 
            { card: { value: 13, color: 'yellow' }, player: 0, name: 'Player 1' },
            { card: { value: 14, color: 'black' }, player: 1, name: 'Player 2' },
            { card: { value: 20, color: 'red' }, player: 2, name: 'Player 3' },
            { card: { value: 14, color: 'green' }, player: 3, name: 'Player 4' },
        ];
    G.players = [
        { currentBid: 1, tricks: 1, score: 0, roundBonus: 0 },
        { currentBid: 1, tricks: 1, score: 0, roundBonus: 0 },
        { currentBid: 1, tricks: 1, score: 0, roundBonus: 0 },
        { currentBid: 0, tricks: 1, score: 0, roundBonus: 0 },
    ]

    let playerroundBonus = scoring.getRoundBonus(2, G.board);
    expect(playerroundBonus).toEqual(20);
});

it('Check Round Bonus: Capture Jolly Rodger 14 and Color 14', () => {
    // Set up delt cards
    G.board =  [ 
            { card: { value: 14, color: 'yellow' }, player: 0, name: 'Player 1' },
            { card: { value: 14, color: 'black' }, player: 1, name: 'Player 2' },
            { card: { value: 20, color: 'red' }, player: 2, name: 'Player 3' },
            { card: { value: 14, color: 'green' }, player: 3, name: 'Player 4' },
        ];
    G.players = [
        { currentBid: 1, tricks: 1, score: 0, roundBonus: 0 },
        { currentBid: 1, tricks: 1, score: 0, roundBonus: 0 },
        { currentBid: 1, tricks: 1, score: 0, roundBonus: 0 },
        { currentBid: 0, tricks: 1, score: 0, roundBonus: 0 },
    ]

    let playerroundBonus = scoring.getRoundBonus(2, G.board);
    expect(playerroundBonus).toEqual(30);
});

it('Check Potential Score: Skull King Captures All', () => {
    // Set up delt cards
    G.board =  [ 
            { card: { value: 14, color: 'yellow' }, player: 0, name: 'Player 1' },
            { card: { value: 14, color: 'black' }, player: 1, name: 'Player 2' },
            { card: { value: 20, color: 'red' }, player: 2, name: 'Player 3' },
            { card: { value: 25, color: 'skullking' }, player: 3, name: 'Player 4' },
        ];
    G.players = [
        { currentBid: 1, tricks: 1, score: 0, roundBonus: 0 },
        { currentBid: 1, tricks: 1, score: 0, roundBonus: 0 },
        { currentBid: 1, tricks: 1, score: 0, roundBonus: 0 },
        { currentBid: 1, tricks: 1, score: 0, roundBonus: 0 },
    ]

    let playerroundBonus = scoring.getRoundBonus(3, G.board);
    expect(playerroundBonus).toEqual(60);
});

it('Check Potential Score: Player 4 should not have bonus', () => {
    // Set up delt cards
    G.board = [
        { card: { value: 14, color: 'yellow' }, player: 0, name: 'Player 1' },
        { card: { value: 14, color: 'black' }, player: 1, name: 'Player 2' },
        { card: { value: 20, color: 'red' }, player: 2, name: 'Player 3' },
        { card: { value: 10, color: 'black' }, player: 3, name: 'Player 4' },
    ];
    G.players = [
        { currentBid: 1, tricks: 1, score: 0, roundBonus: 0 },
        { currentBid: 1, tricks: 1, score: 0, roundBonus: 0 },
        { currentBid: 1, tricks: 1, score: 0, roundBonus: 0 },
        { currentBid: 1, tricks: 1, score: 0, roundBonus: 0 },
    ]

    let playerroundBonus = scoring.getRoundBonus(3, G.board);
    //expect(playerroundBonus).toEqual(0);
});

it('Check Actual Score: Correct bid 0 - R:5, B:0, T:0', () => {
    G.round = 5;
    G.players = [
        { currentBid: 0, tricks: 0, score: 20, roundBonus: 0 },
    ]

    let playerActualScore = scoring.getActualRoundScore(G.players[0], G.round);
    expect(playerActualScore).toEqual(50);
});

it('Check Actual Score: Incorrect Bid 0 - R:5, B:0, T:1', () => {
    G.round = 5;
    G.players = [
        { currentBid: 0, tricks: 1, score: 50, roundBonus: 50 },
    ]

    let playerActualScore = scoring.getActualRoundScore(G.players[0], G.round);
    expect(playerActualScore).toEqual(-50);
});

it('Check Actual Score: Correct Bid 2 - R:5, B:2, T:2', () => {
    G.round = 5;
    G.players = [
        { currentBid: 2, tricks: 2, score: 20, roundBonus: 40 },
    ]

    let playerActualScore = scoring.getActualRoundScore(G.players[0], G.round);
    expect(playerActualScore).toEqual(80);
});

it('Check Actual Score: Incorrect Bid 2 - R:5, B:2, T:4', () => {
    G.round = 5;
    G.players = [
        { currentBid: 2, tricks: 4, score: 20, roundBonus: 40 },
    ]

    let playerActualScore = scoring.getActualRoundScore(G.players[0], G.round);
    expect(playerActualScore).toEqual(-20);
});