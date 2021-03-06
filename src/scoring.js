export function getRoundBonus(playerIndex, cards) {
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
        if (player.currentBid === 0) {
            return round * 10;
        } else {
            return (player.tricks * 20) + player.roundBonus;
        }
    } else if (player.currentBid === 0) {
        return round * -10;
    } else {
        return Math.abs(player.currentBid - player.tricks) * -10;
    }
}

export function getRoundScoresOnly(players, round) {
    let scores = [];
    for (let i = 0; i < players.length; i++) {
        scores.push( getActualRoundScore(players[i], round) );
    }

    return scores;
}

export function getRoundScores(players, round) {
    for (let i = 0; i < players.length; i++) {
        players[i].score += getActualRoundScore(players[i], round);
    }

    return players;
}