const core = require('@actions/core');
const poll = require('./btcpoll');
const axios = require('axios');

// modify this to ping url, get data and update, commit and push file to github repo
try {
//  const res = poll.main()
  console.log("main response: this is a test file trial ");

  const res = axios.get('https://google.com').then(response => {
    return response;
  }).catch(err => {
    console.log(err);
  });
  
  console.log(" this is the res: " , res);
  core.setOutput('✅ Success');

} catch (error) {
  core.setFailed(`🛑 ${error.message}`); 
}