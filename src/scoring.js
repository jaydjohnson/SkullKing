export function getPotentialScores(player, cards) {
    let score = player.potentialScore;
    if (player.bid === 0) {
        score += 10;
    } else {
        score += 20;
    }

    return score;
}

export function getHandScores(players) {
    for (let i = 0; i < players.length; i++) {
        if (players[i].currentBid === players[i].tricks) {
            console.log(players[i].potentialScore);
            players[i].score += players[i].potentialScore;
        }

        players[i].potentialScore = 0;

    }

    return players;
}