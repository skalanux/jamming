import React, { Component } from 'react';
import './Track.css';

class Track extends Component {
    renderAction() {
        return <a>{this.props.isRemoval ? '-' : '+'}</a>
    }
    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>StrangeLove</h3>
                    <p> Depeche Mode | Music for the masses</p>
                </div>
                <a className="Track-action">{this.renderAction()}</a>
            </div>
        );
    }
}

export default Track;

