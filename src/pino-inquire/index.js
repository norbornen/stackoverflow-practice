// @ts-node

const inquirer = require('inquirer');
const { getLogger } = require(`./logger`);

const logger = getLogger();

const test = function (answer) {
    logger.info(JSON.parse(answer));
};

const questions = [
    {
        type: 'input',
        name: 'question',
        message: 'question to user',
        default: function () {
            return '';
        },
    },
];

inquirer.prompt(questions).then((answer) => {
    test(JSON.stringify(answer, null, '  '));
});
