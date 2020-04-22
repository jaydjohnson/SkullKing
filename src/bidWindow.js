import React from 'react';

class BidWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedBid: null,
            confirmedBid: false,
        }
    }

    selectBid = (i) => {
        this.setState({selectedBid: i});
    }

    confirmBid = () => {
        if (this.state.selectedBid !== null) {
            this.setState({confirmedBid: true});
            this.props.onClick(this.state.selectedBid, parseInt(this.props.player));
        }
    }

    render() {

        let bidNumbers = [];
        for (let i = 0; i <= this.props.round; i++) {
            bidNumbers.push(
                <div
                    key={i}
                    className={'bidNumber ' + (this.state.selectedBid === i ? 'selected' : '') }
                    onClick={() => this.selectBid(i)}
                >
                    {i}
                </div>
            );
        }

        if (this.state.confirmedBid) {
            bidNumbers = (
                <h3>Waiting for other players...<br/>You bid {this.state.selectedBid}</h3>
                
            )
        }
        let bidButton = this.state.confirmedBid ? '' : (<button onClick={this.confirmBid}>Yo Ho Ho!</button>);

        return (
            <div id="bid-window">
                {this.state.confirmedBid ? '' : (<h3>Select your bid</h3>)}
                <div className="bid-list">
                    {bidNumbers}
                </div>
                {bidButton}
            </div>
        )
    }
}

export default BidWindow;