import React, { Component } from 'react';

class Board extends Component {

    constructor(props) {
        super(props)
        this.state = {
            change: props,
        };
    }

    close = () => {
        let { index } = this.props;
        this.props.removeItem(index);
    }

    changeState = () => {
        let { index } = this.props;
        this.props.markAsDone(index);
    }

    render() {
        var decoration = this.props.item.finished;
        return (
            <div className={'row pt-2 pb-2 pl-1 pr-1 mb-1 boardContainer ' +decoration}>
                <div className="col-11 text-left" onClick={this.changeState}>
                    {this.props.item.item}
                </div>
                
                <div className="col-1 pl-0 pr-0">
                    <i onClick={this.close} className="fa fa-window-close"></i>
                </div>
            </div>
        );
    }
}

export default Board;