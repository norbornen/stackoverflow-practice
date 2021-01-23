// @ts-check
const readline = require('readline');

(async () => {
  const limit = 2;
  const arr = [];
  while(1) {
    try {
      const str = await ask(`Введите число #${1 + arr.length}: `);
      const number = +str;
      if (!Number.isNaN(number)) {
        arr.push(number);
      }
      if (arr.length === limit) {
        break;
      }
    } catch (err) {}
  }

  const sum = arr.reduce((acc, x) => acc += x, 0);
  console.log(sum);
})();

/**
 * @param {string} question
 * @returns {Promise<string>}
 */
async function ask(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve, reject) => {
    rl.question(question, (answer) => {
      rl.close();
      if (answer === null || answer === undefined || !/\S/.test(answer)) {
        return reject();
      }
      resolve(answer);
    });
  });
}
