// @ts-check
const readline = require('readline');


process.stdin.on('data', (chunk) => {
  console.log(chunk);
});

console.log('n');


// run();

function run(){
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  askInteger(rl, 'Введите количество элементов: ', (count) => {
    fillArray(rl, count, undefined, (arr) => {
      rl.close();

      const sum = arr.reduce((acc, x) => acc += x, 0);
      console.log(sum);
    });
  });
}

function fillArray(rl, count, arr=[], cb) {
  askInteger(rl, `Введите число #${1 + arr.length}: `, (number) => {
    arr.push(number);
    if (arr.length !== count) {
      fillArray(rl, count, arr, cb);
    } else {
      cb(arr);
    }
  });
}

function askInteger(rl, question, cb) {
  rl.question(question, (answer) => {
    /** @type {number} */
    let number;
    if (answer !== null && answer !== undefined && answer !== '') {
      number = +answer;
    }

    if (Number.isInteger(number)) {
      cb(number);
    } else {
      console.warn('INCORRECT_INPUT');
      askInteger(rl, question, cb);
    }
  });
}

// (async () => {

//   try {
//     const count = await askInteger('Введите количество элементов: ');
//     const arr = [];
//     while (arr.length < count) {
//       try {
//         const number = await askInteger(`Введите число #${1 + arr.length}: `);
//         arr.push(number);
//       } catch (err) {}
//     }

//     const sum = arr.reduce((acc, x) => acc += x, 0);
//     console.log(sum);
    
//   } catch (err) {
//     console.error(err);
//   }

// })();

// /**
//  * @param {*} question
//  * @returns {Promise<number>}
//  */
// async function askInteger(question) {


//   return new Promise((resolve, reject) => {
//     rl.question(question, (answer) => {
//       rl.close();

//       /** @type {number} */
//       let number;
//       if (answer !== null && answer !== undefined && answer !== '') {
//         number = +answer;
//       }
      
//       return Number.isInteger(number) ? resolve(number) : reject('INCORRECT_INPUT');
//     });
//   });
// }
