// @ts-check
const readline = require('readline');

(async () => {

  try {
    const count = await askInteger('Введите количество элементов: ');
    const arr = [];
    while (arr.length < count) {
      try {
        const number = await askInteger(`Введите число #${1 + arr.length}: `);
        arr.push(number);
      } catch (err) {}
    }

    const sum = arr.reduce((acc, x) => acc += x, 0);
    console.log(sum);
    
  } catch (err) {
    console.error(err);
  }

})();

/**
 * @param {*} question
 * @returns {Promise<number>}
 */
async function askInteger(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve, reject) => {
    rl.question(question, (answer) => {
      rl.close();

      /** @type {number} */
      let number;
      if (answer !== null && answer !== undefined && answer !== '') {
        number = +answer;
      }
      
      return Number.isInteger(number) ? resolve(number) : reject('INCORRECT_INPUT');
    });
  });
}
