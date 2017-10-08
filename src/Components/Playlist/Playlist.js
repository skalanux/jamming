import React, { Component } from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList'

class Playlist extends Component {
    render() {
        return (
            <div className="Playlist">
                <TrackList tracks={this.props.playlistTracks} />
                <input defaultValue={'New Playlist'} />
                <a className="Playlist-save">SAVE TO SPOTIFY</a>
            </div>
        );
    }
}

export default Playlist;

