const core = require('@actions/core');
const poll = require('./btcpoll');
//const axios = require('axios');

// modify this to ping url, get data and update, commit and push file to github repo
try {
//  const res = poll.main()
  console.log("main response: this is a test file trial ")
  core.setOutput('✅ Success');

} catch (error) {
  core.setFailed(`🛑 ${error.message}`); 
}