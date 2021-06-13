// @ts-check
const { curly } = require('node-libcurl');
const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream/promises');

(async () => {
  const { data } = await curly.get(
    'http://mirprivet.ru/wp-content/uploads/2016/01/ostrova-portugalii-300x203.jpg',
    {
      curlyStreamResponse: true
    }
  );

  const writableStream = fs.createWriteStream(
    path.join(__dirname, './image2.jpg')
  );
  await pipeline(data, writableStream);
})();
