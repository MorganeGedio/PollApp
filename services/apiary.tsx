import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://polls.apiblueprint.org', 
    responseType: 'json'
});

export default instance;