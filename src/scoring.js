export function getPotentialScores(player, playerIndex, cards) {
    let score = player.potentialScore;
    if (player.currentBid === 0) {
        score += 10;
    } else {
        score += 20;
        // Check Captures/Bonus
        score += scoreCaptures(playerIndex, cards);
    }

    return score;
}

function scoreCaptures(playerIndex, cards) {
    let bonus = 0;
    for (let i = 0; cards[i].player !== playerIndex; i++) {
        if (cards[i].card.value === 14 && cards[i].card.color !== 'black') {
            bonus += 10
        }
        if (cards[i].card.value === 14 && cards[i].card.color === 'black') {
            bonus += 20;
        }
        if (cards[i].card.color === 'red') {
            bonus += 30;
        }
    }
    return bonus;
}

export function getActualRoundScore(player, round) {
    if (player.currentBid === player.tricks) {
        return player.potentialScore;
    } else if (player.currentBid === 0) {
        return round * -10;
    } else {
        return Math.abs(player.currentBid - player.tricks) * -10;
    }
}

export function getRoundScores(players, round) {
    for (let i = 0; i < players.length; i++) {
        players[i].score += getActualRoundScore(players[i], round);
    }

    return players;
}