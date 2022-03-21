const core = require('@actions/core');
const poll = require('./btcpoll');

// modify this to ping url, get data and update, commit and push file to github repo
try {
  const res = poll.main()
  console.log("main response: ", res)
  core.setOutput('✅ Success');

} catch (error) {
  core.setFailed(`🛑 ${error.message}`); 
}

