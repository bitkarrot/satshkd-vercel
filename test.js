const core = require('@actions/core');

// modify this to ping url, get data and update, commit and push file to github repo
try {
  console.log("main response: this is a test file trial ")
  core.setOutput('✅ Success');

} catch (error) {
  core.setFailed(`🛑 ${error.message}`); 
}