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
        { id: 1, uri: 123124234, name: 'Enjoy the silence', artist: 'Depeche Mode', album: 'Violator' },
        { id: 2, uri: 2342335235, name: 'Strangelove', artist: 'Depeche Mode', album: 'Music for the masses' },
        { id: 3, uri: 2342335236, name: 'Where is the revolution', artist: 'Depeche Mode', album: 'Spirit' }
      ],
      searchResults: [
        { id: 4, uri: 2342335237, name: 'Barrel of a gun', artist: 'Depeche Mode', album: 'Ultra' },
        { id: 5, uri: 2342335238, name: 'Its no good', artist: 'Depeche Mode', album: 'Ultra' },
        { id: 6, uri: 2342335240, name: 'Behind the wheel', artist: 'Depeche Mode', album: 'Music for the masses' }
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
      if (playlistTrack.uri === track.uri) {
        isOnTrack = true;
      }
    });
    if (!isOnTrack) {
      this.state.playlistTracks.push(track);
      this.setState({ playlistTracks: this.state.playlistTracks });
    }
  }
  removeTrack(track) {
    const playlistTracks = this.state.playlistTracks.filter(playlistTrack => playlistTrack.uri !== track.uri);
    this.setState({ playlistTracks: playlistTracks });
  }
  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }
  savePlayList() {
    const trackUris = this.state.playlistTracks.map(track => track.uri);
  }
  search(term) {
    console.log(term);
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
