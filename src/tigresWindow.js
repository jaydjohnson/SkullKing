import React from 'react';

class TigresWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            confirmedOption: false,
        }
    }

    selectOption = (i) => {
        this.setState({ selectedOption: i });
    }

    confirmOption = () => {
        if (this.state.selectedOption !== null) {
            this.setState({ confirmedOption: true });
            this.props.onClick(this.state.selectedOption);
        }
    }

    render() {

        let options = [];
        options.push(
            <div
                key={1}
                className={'tigresOption white ' + (this.state.selectedOption === 1 ? 'selected' : '')}
                onClick={() => this.selectOption(1)}
            >
                Escape
            </div>
        );
        options.push(
            <div
                key={2}
                className={'tigresOption red ' + (this.state.selectedOption === 2 ? 'selected' : '')}
                onClick={() => this.selectOption(2)}
            >
                Pirate
            </div>
        );

        let optionButton = this.state.confirmedOption ? '' : (<button onClick={this.confirmOption}>Arrrh!</button>);

        return (
            <div className="tigresWindow">
                <h3>Are ye Pirate or a yellow-bellied cur?</h3>
                <p>The Tigres can be played as either a Pirate or on Escape card.</p>
                <div className="tigresWindow-options">
                    {options}
                </div>
                {optionButton}
            </div>
        )
    }
}

export default TigresWindow;