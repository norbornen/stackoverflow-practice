// @ts-check
const fs = require('fs');
const path = require('path');

(async () => {

  const inputfile = path.join(__dirname, 'input.txt');
  const outputfile = path.join(__dirname, 'output.txt');
  try {
    await fs.promises.unlink(outputfile);
  } catch (err) {
    //
  }


  const readStream = fs.createReadStream(inputfile, { highWaterMark: 10 });
  const writeStream = fs.createWriteStream(outputfile);
  let iv;
  readStream.once('readable', () => {
    iv = readStream.read(6);
    // console.log(`read first bytes "${z}"`);
    // readStream.pause();
    // readStream.pipe(writeStream);
  });
  // const firstByte = await stream1[Symbol.asyncIterator]().next();
  // console.log(`${filepath} >>> ${firstByte.value}`);

  // const stream2 = fs.createReadStream(
  //   filepath,
  //   {
  //     start: 6
  //   }
  // );
  for await (const chunk of readStream) {
    console.log(`iv=${iv}, chunk=${chunk}`);
  }



})();
