import React, { Component } from 'react';
import './App.css';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../util/Spotify';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistName: 'Depeche',
      playlistTracks: [
      ],
      searchResults: [
      ]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlayList = this.savePlayList.bind(this);
    this.search = this.search.bind(this);
  }
  addTrack(track) {
    let isOnTrack = false;
    this.state.playlistTracks.forEach(playlistTrack => {
      if (playlistTrack.URI === track.URI) {
        isOnTrack = true;
      }
    });
    if (!isOnTrack) {
      this.state.playlistTracks.push(track);
      this.setState({ playlistTracks: this.state.playlistTracks });
    }
  }
  removeTrack(track) {
    const playlistTracks = this.state.playlistTracks.filter(playlistTrack => playlistTrack.URI !== track.URI);
    this.setState({ playlistTracks: playlistTracks });
  }
  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }
  savePlayList() {
    const trackUris = this.state.playlistTracks.map(track => track.URI);
    Spotify.savePlayList(this.state.playlistName, trackUris).then(results => {
      this.setState({ searchResults: [], playlistName: 'New Playlist' });
    });

  }
  search(term) {
    Spotify.search(term).then(results => {
      console.log(results);
      this.setState({ searchResults: results })
    });

  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlayList} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
