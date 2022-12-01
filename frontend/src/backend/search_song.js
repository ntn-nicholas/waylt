import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';
import { useState, useEffect} from 'react';
const CLIENT_ID = "86aa68066b214479b85958aa0912c9e6";
const CLIENT_SECRET = "bb6e78f6edc54c1cb764bfcb1bbe75fd";
function search_song(search_criteria) {
  const [searchInput, setSearchInput] = useState("")
  const [accessToken, setAccessToken] = useState("")
  const [albums, setAlbums] = useState([])
  const [tracks, setTracks] = useState([])
  setSearchInput(search_criteria)

  useEffect(() => {
    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token', authParameters)
    .then(result => result.json())
    .then(data => setAccessToken(data.access_token))
  }, [])

  async function search() {
    
    var searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }

    var returnedTracks = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=track', searchParameters)
    .then(response => response.json())
    .then(data => {setTracks(data.tracks.items);})

    var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
    .then(response => response.json())
    .then(data => {return data.artists.items[0].id})

    var returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums?include_groups=album&market=US&limit=50', searchParameters)
    .then(response => response.json())
    .then(data => {
      setAlbums(data.items);
    })
  }
  return tracks;
}

export default search_song;
