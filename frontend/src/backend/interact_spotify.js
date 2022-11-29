import { getTokenFromUrl } from './login';
import SpotifyWebApi from 'spotify-web-api-js';

const spotify = new SpotifyWebApi();

console.log(getTokenFromUrl());
console.log("hello there");