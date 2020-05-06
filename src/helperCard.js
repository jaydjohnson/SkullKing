import React from 'react';
import * as skCards from "./cardDeck";
import TigresWindow from './tigresWindow';

class HelperCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCard: false,
            showScore: false,
        }
    }

    handleTigresClose = () => {
        this.setState({ selectedTigresValue: null, chooseTigresValue: false });
    }

    handleClick = () => {
        let showCard = ! this.state.showCard;
        this.setState({showCard: showCard});
    }

    handleCardFlip = () => {
        let showScore = ! this.state.showScore;
        this.setState({showScore: showScore});
    }

    render() {

        let cardImage = this.state.showScore ? 'score-front' : 'score-back';

        return (
            <div className="helperCard">
                {this.state.showCard ? (
                    <div
                        className={'card'}
                        onClick={this.handleCardFlip}
                    >
                        <img src={process.env.REACT_APP_IMAGE_HOST + '/cards/' + cardImage + '.png'} alt='card#' />
                    </div>
                ) : ''}
                <button onClick={this.handleClick}>{this.state.showCard ? 'Hide' : 'Show'} Help Card</button>
            </div>
        )
    }
}

export default HelperCard;