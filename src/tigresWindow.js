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
            this.props.onClick(this.state.selectedOption, parseInt(this.props.player));
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
                White-0
            </div>
        );
        options.push(
            <div
                key={2}
                className={'tigresOption red ' + (this.state.selectedOption === 2 ? 'selected' : '')}
                onClick={() => this.selectOption(2)}
            >
                Red-20
            </div>
        );

        let optionButton = this.state.confirmedOption ? '' : (<button onClick={this.confirmOption}>Yo Ho Ho!</button>);

        return (
            <div id="tigres-window">
                {this.state.selectedOption ? '' : (<h3>Are ye yellow-bellied cur or Pirate?</h3>)}
                <div className="tigres-options">
                    {options}
                </div>
                {optionButton}
            </div>
        )
    }
}

export default TigresWindow;