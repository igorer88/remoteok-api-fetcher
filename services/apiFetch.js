'use strict';
const Job = require('../db/job');
const axios = require('axios');

axios.defaults.baseURL = 'https://remoteok.io/';

async function get() {
  try {
    const response = await axios.get(`api/`);
    console.log('Fetching from server...')
    console.log('Response status: ');
    console.log(response.status, response.statusText);
    console.log('Legal Notice: ', response.data[0].legal);
    return response;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  get
}
