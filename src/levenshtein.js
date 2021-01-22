// @ts-check

// const levenshtein = require('fast-levenshtein');

// function compareLevenshtein(str, arr) {
//     return arr.sort((a, b) => levenshtein.get(str, a) - levenshtein.get(str, b))[0];
// }

// const arr = ['toster','tester','tescer'];
// const str = 'tescor';

// console.log(compareLevenshtein(str, arr)); // tescer

const levenshtein = require('fast-levenshtein');
const natural = require('natural');

function compareJaroWinkler(str, array) {
    // arr.forEach((x) => console.log(x, natural.JaroWinklerDistance(str, x)));
    return arr.sort((a, b) => natural.JaroWinklerDistance(str, b) - natural.JaroWinklerDistance(str, a))[0];
}

function compareLevenshtein(str, arr) {
    return arr.sort((a, b) => levenshtein.get(str, a) - levenshtein.get(str, b))[0];
}

// const arr = ['концерт в омске', 'концерт в комске', 'концерт в москве'];
// const str = 'концерт в томске';

let arr = [  
    'баги',
    'bots',
    'чат',
    'боты',
    'ботыад',
    'информация'
];
const str = 'бот';

console.log('->', str);
console.log('<-', compareJaroWinkler(str, arr));
console.log('<-', compareLevenshtein(str, arr));
