// @ts-check
const { default: fetch } = require('node-fetch');
const { default: axios } = require('axios');

const url = 'https://pelevin.gpt.dobro.ai/generate/';
const requestBody = JSON.stringify({ prompt: 'мохнатый сыр', length: 50 });
const userAgent = 'Mozilla/5.0';

(async () => {
  try {
    const p1 = fetch(
      url, {
        method: 'POST',
        body: requestBody,
        headers: {
          'User-Agent': userAgent
        }
      }
    ).then((r) => r.json());
    const p2 = axios.post(
      url, requestBody, {
        headers: {
          'User-Agent': userAgent
        }
      }
    );
    const [data1, { data: data2 }] = await Promise.all([p1, p2]);
    console.log(data1);
    console.log(data2);
  } catch (err) {
    console.error(err);
  }
})();
