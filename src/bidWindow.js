import React from 'react';

class BidWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedBid: null,
        }
    }

    selectBid(i) {
        this.setState({selectedBid: i});
    }

    confirmBid() {
        console.log(this.state.selectedBid);
        if (this.state.selectedBid !== null) {
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

        return (
            <div id="bid-window">
                <h3>Select your bid</h3>
                <div className="bid-list">
                    {bidNumbers}
                </div>
                <button onClick={() => this.confirmBid()}>Yo Ho Ho!</button>
            </div>
        )
    }
}

export default BidWindow;