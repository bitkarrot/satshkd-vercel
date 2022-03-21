const core = require('@actions/core');
const fs = require('fs')
// const axios = require('axios');
const fetch = require('node-fetch');
const moment = require('moment');

const path = require('path');
const dirPath = path.join(__dirname, ".");
const fileToWrite = dirPath + "/public/hkd_historical"
const fileToRead = dirPath + "/public/hkd_historical"

// modify this to ping url, get data and update, commit and push file to github repo
try {
  console.log("main response: this is a test file trial ")
  core.setOutput('✅ Success');

} catch (error) {
  core.setFailed(`🛑 ${error.message}`); 
}