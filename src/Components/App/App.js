import React, { Component } from 'react';
import './App.css';
import Playlist from '../Playlist/Playlist'
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistName: 'Depeche',
      playlistTracks: [
        { id: 1, name: 'Enjoy the silence', artist: 'Depeche Mode', album: 'Violator' },
        { id: 2, name: 'Strangelove', artist: 'Depeche Mode', album: 'Music for the masses' },
        { id: 3, name: 'Where is the revolution', artist: 'Depeche Mode', album: 'Spirit' }
      ],
      searchResults: [
        { id: 1, name: 'Enjoy the silence', artist: 'Depeche Mode', album: 'Violator' },
        { id: 2, name: 'Strangelove', artist: 'Depeche Mode', album: 'Music for the masses' },
        { id: 3, name: 'Where is the revolution', artist: 'Depeche Mode', album: 'Spirit' }
      ]
    };
  }
  addTrack(track) {
    let isOnTrack = false;

    this.state.playlistTracks.forEach(playlistTrack => {
      if (playlistTrack.id === track.id) {
        isOnTrack = true;
      }
    });

    if (!isOnTrack) {
      this.setState({ playlistTracks: this.state.playlistTracks.push(track) });
    }
  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
