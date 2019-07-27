'use strict';

const axios = require('axios');

axios.defaults.baseURL = 'https://remoteok.io/';

async function get() {
  try {
    const response = await axios.get(`api/`);
    console.log('Fetching from server...');
    console.log('Response status: ');
    console.log(response.status, response.statusText);

    if (response.status === 200) {
        console.log('Legal Notice: ', response.data[0].legal);
    }
    if (response.status >= 400 && response.status < 500) {
        console.error('Maybe the API has changed?');
    }
    if (response.status >= 500) {
        console.error('There seems to be a problem with the server,');
        console.error('Try again later.');
    }
    return response;
  } catch (error) {
    if (error.code === 'ENOTFOUND') {
      console.error(`Could not connect to the host: ${error.config.url}`);
    }
  }
}

module.exports = {
  get
}
