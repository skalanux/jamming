import React, { Component } from 'react';
import './Track.css';

class Track extends Component {
    renderAction() {
        return this.props.isRemoval ? '-' : '+';
    }
    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.name}</h3>
                    <p> {this.props.artist} | {this.props.album} </p>
                </div>
                <a className="Track-action">{this.renderAction()}</a>
            </div>
        );
    }
}

export default Track;

