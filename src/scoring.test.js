import * as scoring from "./scoring";

const G = {
    players: [],
    board: [],
    round: 1,
};

it('Check Potential Score: Bid 1 and Bid 0', () => {
    // Set up delt cards
    G.board =  [ 
            { card: { value: 10, color: 'yellow' }, player: 0, name: 'Player 1' },
            { card: { value: 3, color: 'yellow' }, player: 1, name: 'Player 2' },
            { card: { value: 1, color: 'yellow' }, player: 2, name: 'Player 3' },
            { card: { value: 6, color: 'yellow' }, player: 3, name: 'Player 4' },
        ];
    G.players = [
        { currentBid: 1, tricks: 1, score: 0, potentialScore: 0 },
        { currentBid: 0, tricks: 1, score: 0, potentialScore: 0 },
        { currentBid: 0, tricks: 1, score: 0, potentialScore: 0 },
        { currentBid: 0, tricks: 1, score: 0, potentialScore: 0 },
    ]

    let player1PotentialScore = scoring.getPotentialScores(G.players[0], 0, G.board);
    let player2PotentialScore = scoring.getPotentialScores(G.players[1], 1, G.board);
    expect(player1PotentialScore).toEqual(20);
    expect(player2PotentialScore).toEqual(10);
});

it('Check Potential Score: Capture 14', () => {
    // Set up delt cards
    G.board =  [ 
            { card: { value: 14, color: 'yellow' }, player: 0, name: 'Player 1' },
            { card: { value: 3, color: 'yellow' }, player: 1, name: 'Player 2' },
            { card: { value: 4, color: 'black' }, player: 2, name: 'Player 3' },
            { card: { value: 14, color: 'green' }, player: 3, name: 'Player 4' },
        ];
    G.players = [
        { currentBid: 1, tricks: 1, score: 0, potentialScore: 0 },
        { currentBid: 0, tricks: 1, score: 0, potentialScore: 0 },
        { currentBid: 1, tricks: 1, score: 0, potentialScore: 0 },
        { currentBid: 0, tricks: 1, score: 0, potentialScore: 0 },
    ]

    let playerPotentialScore = scoring.getPotentialScores(G.players[2], 2, G.board);
    expect(playerPotentialScore).toEqual(30);
});

it('Check Potential Score: Capture Jolly Rodger 14', () => {
    // Set up delt cards
    G.board =  [ 
            { card: { value: 13, color: 'yellow' }, player: 0, name: 'Player 1' },
            { card: { value: 14, color: 'black' }, player: 1, name: 'Player 2' },
            { card: { value: 20, color: 'red' }, player: 2, name: 'Player 3' },
            { card: { value: 14, color: 'green' }, player: 3, name: 'Player 4' },
        ];
    G.players = [
        { currentBid: 1, tricks: 1, score: 0, potentialScore: 0 },
        { currentBid: 1, tricks: 1, score: 0, potentialScore: 0 },
        { currentBid: 1, tricks: 1, score: 0, potentialScore: 0 },
        { currentBid: 0, tricks: 1, score: 0, potentialScore: 0 },
    ]

    let playerPotentialScore = scoring.getPotentialScores(G.players[2], 2, G.board);
    expect(playerPotentialScore).toEqual(40);
});

it('Check Potential Score: Capture Jolly Rodger 14 and Color 14', () => {
    // Set up delt cards
    G.board =  [ 
            { card: { value: 14, color: 'yellow' }, player: 0, name: 'Player 1' },
            { card: { value: 14, color: 'black' }, player: 1, name: 'Player 2' },
            { card: { value: 20, color: 'red' }, player: 2, name: 'Player 3' },
            { card: { value: 14, color: 'green' }, player: 3, name: 'Player 4' },
        ];
    G.players = [
        { currentBid: 1, tricks: 1, score: 0, potentialScore: 0 },
        { currentBid: 1, tricks: 1, score: 0, potentialScore: 0 },
        { currentBid: 1, tricks: 1, score: 0, potentialScore: 0 },
        { currentBid: 0, tricks: 1, score: 0, potentialScore: 0 },
    ]

    let playerPotentialScore = scoring.getPotentialScores(G.players[2], 2, G.board);
    expect(playerPotentialScore).toEqual(50);
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
        { currentBid: 1, tricks: 1, score: 0, potentialScore: 0 },
        { currentBid: 1, tricks: 1, score: 0, potentialScore: 0 },
        { currentBid: 1, tricks: 1, score: 0, potentialScore: 0 },
        { currentBid: 1, tricks: 1, score: 0, potentialScore: 0 },
    ]

    let playerPotentialScore = scoring.getPotentialScores(G.players[3], 3, G.board);
    expect(playerPotentialScore).toEqual(80);
});

it('Check Actual Score: Correct bid 0 - R:5, B:0, T:0', () => {
    G.round = 5;
    G.players = [
        { currentBid: 0, tricks: 0, score: 50, potentialScore: 50 },
    ]

    let playerActualScore = scoring.getActualRoundScore(G.players[0], G.round);
    expect(playerActualScore).toEqual(50);
});

it('Check Actual Score: Incorrect Bid 0 - R:5, B:0, T:1', () => {
    G.round = 5;
    G.players = [
        { currentBid: 0, tricks: 1, score: 50, potentialScore: 50 },
    ]

    let playerActualScore = scoring.getActualRoundScore(G.players[0], G.round);
    expect(playerActualScore).toEqual(-50);
});

it('Check Actual Score: Correct Bid 2 - R:5, B:2, T:2', () => {
    G.round = 5;
    G.players = [
        { currentBid: 2, tricks: 2, score: 50, potentialScore: 40 },
    ]

    let playerActualScore = scoring.getActualRoundScore(G.players[0], G.round);
    expect(playerActualScore).toEqual(40);
});

it('Check Actual Score: Incorrect Bid 2 - R:5, B:2, T:2', () => {
    G.round = 5;
    G.players = [
        { currentBid: 2, tricks: 4, score: 50, potentialScore: 80 },
    ]

    let playerActualScore = scoring.getActualRoundScore(G.players[0], G.round);
    expect(playerActualScore).toEqual(-20);
});