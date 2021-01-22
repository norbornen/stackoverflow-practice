// @ts-check
const fs = require('fs');
const path = require('path');

(async () => {

  const stream = fs.createReadStream(path.join(__dirname, './csv/8.csv'));

  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }

  const buffer = Buffer.concat(chunks);
  console.log(`bufferLength=${buffer.length}`);

  stream.close();

})();
