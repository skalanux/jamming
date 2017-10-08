const clientId = '15f069982add4ab9b3ce136e4fcb36b4';
const redirectUri = 'http://localhost:3000/';
let userAccessToken = '';

const Spotify = {
    search: async function (term) {
        this.getUserAccessToken();
        let url = `https://api.spotify.com/v1/search?type=track&q=${term}`;
        try {
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + userAccessToken
                }
            });
            if (response.ok) {
                let jsonResponse = await response.json();
                /*

                    ID — returned as track.id
                    Name — returned as track.name
                    Artist — returned as track.artists[0].name
                    Album — returned as track.album.name
                    URI — returned as track.uri
                */
                let tracks = jsonResponse.tracks.items.map(track => {
                    return {
                        ID: track.id,
                        artist: track.artists[0].name, Name: track.name, Album: track.album.name, URI: track.uri
                    }
                })
                return tracks;
            }
            throw new Error('Error on retrieving data from Spotify API')
        } catch (error) {
            console.log(error);
        }

    },
    savePlayList: async function (name, tracks) {
        this.getUserAccessToken();
        if (name === undefined || tracks === undefined) {
            return
        }
        let accessToken = userAccessToken;
        let headers = { 'Authorization': 'Bearer ' + userAccessToken };
        let userId;
        let urlUserInfo = 'https://api.spotify.com/v1/me';
        let response = await fetch(urlUserInfo, { headers: headers });

        let userInfo = await response.json();
        headers = { ...headers, 'Content-Type': 'application/json' }
        let responseCreatePlayList = await fetch(`https://api.spotify.com/v1/users/${userInfo.id}/playlists`,
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ name: name })
            },

        )
        let playlistInfo = await responseCreatePlayList.json();
        let playlistId = playlistInfo.id;
        let createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userInfo.id}/playlists/${playlistId}/tracks`,
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ uris: tracks })
            })

    },
    getUserAccessToken: function () {
        if (userAccessToken) {
            return userAccessToken;
        }
        else if (window.location.href.match(/access_token=([^&]*)/) != null) {
            userAccessToken = window.location.href.match(/access_token=([^&]*)/)[0].split("=")[1];
            let expiresIn = window.location.href.match(/expires_in=([^&]*)/)[0].split("=")[1];
            window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        } else {
            window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
        }
    }
};
export default Spotify;