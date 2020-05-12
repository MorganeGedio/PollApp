import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://polls.apiblueprint.org'
});

export default instance;