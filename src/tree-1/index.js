const fs = require('fs');
const pathModule = require('path');
const util = require('util');

function tree(path) {
    return new Promise((resolve, reject) => {
        let result = {
            folders: [],
            files: []
        };

        let count = 0;
        let endedCount = 0;

        let promisifyReadDir = util.promisify((fs.readdir));
        let promisifyStat = util.promisify((fs.stat));

        function addItem(path) {
            ++count;
            promisifyReadDir(path) // Promise
                .then(files => {
                    files.forEach(file => {
                        ++count;
                        promisifyStat(pathModule.join(path, file)) // Promise
                            .then(stats => {
                                if (stats.isDirectory()) {
                                    result.folders.push(file);
                                    addItem(pathModule.join(path, file));
                                }
                                if (stats.isFile()) {
                                    result.files.push(file);
                                }
                            })
                            .finally(() => {
                                ++endedCount === count ? resolve(result) : 0;
                            });
                    });
                })
                .finally(() => {
                    ++endedCount === count ? resolve(result) : 0;
                });
        }

        addItem(path);
    });
}

tree(pathModule.join(process.cwd(), 'node_modules'))
    .then(res => console.log(JSON.stringify(res, null, 2)))
    .catch(err => console.log(err));
