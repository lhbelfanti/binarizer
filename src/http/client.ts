import axios from 'axios';
import config from '../../config/default';

const client = axios.create({
    baseURL: config.client.baseURL,
    timeout: config.client.timeout,
    //headers: {'X-Custom-Header': 'foobar'}
});

export default client;