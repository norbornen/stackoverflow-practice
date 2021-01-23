// @ts-check
const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream');

(async () => {

  const filepath = path.join(process.cwd(), 'large-file.json');

  const stream1 = fs.createReadStream(
    filepath,
    {
      start: 0,
      end: 99,
      highWaterMark: 100
    }
  );
  const firstByte = await stream1[Symbol.asyncIterator]().next();
  console.log(`${filepath} >>> ${firstByte.value}`);

  const stream2 = fs.createReadStream(
    filepath,
    {
      start: 100
    }
  );

  // await pipeline(stream2, cipher, write);

})();
