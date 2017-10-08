const clientId = '15f069982add4ab9b3ce136e4fcb36b4';
const redirectUri = 'http://localhost:3000/';
let userAccessToken = '';

const Spotify = {
    search: async function (term) {
        let url = `https://api.spotify.com/v1/search?type=track&q=${term}`;
        this.getUserAccessToken();
        try {
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + userAccessToken
                }
            });
            if (response.ok) {
                let jsonResponse = await response.json;
                /*

                    ID — returned as track.id
                    Name — returned as track.name
                    Artist — returned as track.artists[0].name
                    Album — returned as track.album.name
                    URI — returned as track.uri
                */
                console.log(jsonResponse);
                return jsonResponse;
            }
            throw new Error('Error on retrieving data from Spotify API')
        } catch (error) {
            console.log(error);
        }

    },
    getUserAccessToken: function () {
        if (userAccessToken) {
            return userAccessToken;
        }
        else if (window.location.href.match(/access_token=([^&]*)/) != null) {
            userAccessToken = window.location.href.match(/access_token=([^&]*)/)[0].split("=")[1];
            let expiresIn = window.location.href.match(/expires_in=([^&]*)/)[0].split("=")[1];
            console.log(window.location.href);
            window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        } else {
            window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
        }
    }
};
export default Spotify;