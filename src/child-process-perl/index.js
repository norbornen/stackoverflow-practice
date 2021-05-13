// @ts-check
const runner = require('child_process');
const path = require('path');

const phpScriptPath = path.join(__dirname, './script.pl');
const argsString = `value,value2,value,${Date.now()}`;
runner.exec(
  `/usr/local/bin/perl ${phpScriptPath} ${argsString}`,
  (err, phpResponse) => {
    if (err) {
      console.log(err);
    }
    console.log(`RESULT=${phpResponse}`);
  }
);
