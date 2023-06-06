export const authEndpoint = 'https://accounts.spotify.com/authorize';

const client_id = "63151b1978cd47e0a328f04be7fe14d7"
const redirect_uri = 'https://waylt-chi.vercel.app/'

const scopes = [
    'user-read-currently-playing',
    'user-read-recently-played',
    'user-read-playback-state',
    'user-top-read'
]

export const loginUrl = `${authEndpoint}?
client_id=${client_id}
&redirect_uri=${redirect_uri}
&scope=${scopes.join("%20")}
&response_type=token
&show_dialog=true` 

// export const getTokenFromUrl = () => {
//     return window.location.hash
//         .substring(1)
//         .split('&')
//         .reduce((initial, item) => {
//             let parts = item.split("=");
//             initial[parts[0]] = decodeURIComponent(parts[1]);
//             return initial;
//         }, {});
// }
