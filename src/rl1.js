// const readline = require('readline');
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
//   })


// rl.question('s? ', (answer) => {
//   console.log(answer);
//   rl.close();
//   process.exit(-1);
// });

let readline = require('readline'); 
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '>'
});
rl.prompt();
rl.on('line', (input) => {
  input = input.toLowerCase();
  console.log(input);
  rl.close();
});
