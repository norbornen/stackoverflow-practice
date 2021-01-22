// @ts-node
let n = 0;
const logger = require(`pino`)({
    name: `test-pino`,
    level: process.env.LOG_LEVEL || `info`,
    mixin() {
        return { line: ++n };
    },
});

module.exports = {
    logger,
    getLogger(options = {}) {
        return logger.child(options);
    },
};
