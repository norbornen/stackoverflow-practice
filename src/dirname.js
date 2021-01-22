// @ts-check

const path = require('path');
const fs = require('fs');

console.log(`cwd=${process.cwd()}, dirname=${__dirname}`);
console.log(`path1=${path.resolve('./routes')}, path2=${path.resolve(__dirname, './routes')}`);


const routersPath = path.resolve(__dirname, './express-blockchain');
fs.readdir(routersPath, (error, files) => {
    if (error) return console.log(error);
    console.log(files);
});

// fs.writeFile(path.join(__dirname, "text.txt"), "hello", (err) => {
//     console.error(err)
// });
