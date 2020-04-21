export function SkullKingDeck() {
    return [
        { value: 1, color: 'yellow', },
        { value: 2, color: 'yellow', },
        { value: 3, color: 'yellow', },
        { value: 4, color: 'yellow', },
        { value: 5, color: 'yellow', },
        { value: 6, color: 'yellow', },
        { value: 7, color: 'yellow', },
        { value: 8, color: 'yellow', },
        { value: 9, color: 'yellow', },
        { value: 10, color: 'yellow', },
        { value: 11, color: 'yellow', },
        { value: 12, color: 'yellow', },
        { value: 13, color: 'yellow', },
        { value: 14, color: 'yellow', },
        { value: 1, color: 'green', },
        { value: 2, color: 'green', },
        { value: 3, color: 'green', },
        { value: 4, color: 'green', },
        { value: 5, color: 'green', },
        { value: 6, color: 'green', },
        { value: 7, color: 'green', },
        { value: 8, color: 'green', },
        { value: 9, color: 'green', },
        { value: 10, color: 'green', },
        { value: 11, color: 'green', },
        { value: 12, color: 'green', },
        { value: 13, color: 'green', },
        { value: 14, color: 'green', },
        { value: 1, color: 'purple', },
        { value: 2, color: 'purple', },
        { value: 3, color: 'purple', },
        { value: 4, color: 'purple', },
        { value: 5, color: 'purple', },
        { value: 6, color: 'purple', },
        { value: 7, color: 'purple', },
        { value: 8, color: 'purple', },
        { value: 9, color: 'purple', },
        { value: 10, color: 'purple', },
        { value: 11, color: 'purple', },
        { value: 12, color: 'purple', },
        { value: 13, color: 'purple', },
        { value: 14, color: 'purple', },
        { value: 1, color: 'black', },
        { value: 2, color: 'black', },
        { value: 3, color: 'black', },
        { value: 4, color: 'black', },
        { value: 5, color: 'black', },
        { value: 6, color: 'black', },
        { value: 7, color: 'black', },
        { value: 8, color: 'black', },
        { value: 9, color: 'black', },
        { value: 10, color: 'black', },
        { value: 11, color: 'black', },
        { value: 12, color: 'black', },
        { value: 13, color: 'black', },
        { value: 14, color: 'black', },
        { value: 0, color: 'white', },
        { value: 0, color: 'white', },
        { value: 0, color: 'white', },
        { value: 20, color: 'red', },
        { value: 20, color: 'red', },
        { value: 20, color: 'red', },
        { value: 20, color: 'red', },
        { value: 20, color: 'red', },
        { value: 20, color: 'tigres', },
        { value: 25, color: 'skullking', },
        
    ];
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

export function ShuffledSkullKingDeck() {
    return Shuffle(Shuffle(Shuffle(SkullKingDeck())));
}

function cardIndex(card) {
    let colorIndexes = { "white": -1, "yellow": 1, "green": 2, "purple": 3, "black": 4, "red": 5, "tigres": 6, "skullking": 7}
    return ((colorIndexes[card.color] * 14) + card.value - 1);
}

export function sortHand(hand) {
    return hand.sort((a, b) => {
        let aIndex = cardIndex(a);
        let bIndex = cardIndex(b);
        return aIndex-bIndex;
    });
}

export function getWinner(cards) {
    let suit = '';
    let winner = 0;
    let card = null;
    let piratePlayed = false;
    for (let i = 0; i < cards.length; i++ ) {
        card = cards[i].card;
        if ((suit === '' && ['yellow', 'green', 'purple', 'black', 'red'].includes(card.color))) {
            suit = card.color;
            winner = i;
        }

        if (card.color === 'black' && suit !== 'black' && ! piratePlayed) {
            suit = card.color;
            winner = i;
        }

        if (card.color === suit && card.value > cards[winner].card.value) {
            winner = i;
        }

        if (card.color === 'red' && ! piratePlayed) {
            piratePlayed = true;
            winner = i;
        }

        if (card.color === 'skullking') {
            return i;
        }

    }
    return winner;
}

export function getCurrentSuit(playedCards) {
    let suit = '';
    let card = null;
    for(let i=0; i<playedCards.length; i++) {
        card = playedCards[i].card;

        if (i === 0 && ['red', 'skullking'].includes(card.color)) {
            suit = 'none';
        }

        if ((suit === '' && ['yellow', 'green', 'purple', 'black'].includes(card.color))) {
            suit = card.color;
        }
    }

    return suit;
}

export function hasCurrentSuit(playerCards, currentSuit) {
    for(let i=0; i<playerCards.length; i++) {
        if (playerCards[i].color === currentSuit) {
            return true;
        }
    }
    return false;
}

export function isCardAllowed(card, playerCards, playedCards) {
    let currentSuit = getCurrentSuit(playedCards);
    let playerHasCurrentSuit = hasCurrentSuit(playerCards, currentSuit);

    if (['skullking', 'tirges', 'red', 'white'].includes(card.color)) {
        return true;
    }

    if (playerHasCurrentSuit && card.color === currentSuit) {
        return true;
    }

    if (! playerHasCurrentSuit) {
        return true;
    }

    return false;
}