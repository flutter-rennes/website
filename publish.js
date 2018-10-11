const build = require('./build.js');
const { exec } = require('child_process');

build();
exec('git add -A && git commit -m "Published new version of the website"', (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      return;
    }
  
    // the *entire* stdout and stderr (buffered)
    console.log(`${stdout}`);
    console.log(`${stderr}`);
  });