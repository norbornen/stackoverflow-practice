// @ts-check
const natural = require('natural');

natural.PorterStemmerRu.attach();

const userMessage = 'пешу в ппаддержку11! бот-заебот! надоели баги вашего ббота!';

const arr = userMessage.tokenizeAndStem();

['поддержка', 'бот', 'ытот'].forEach((str) => {
    console.log('[d]', str, '->', compareDiceCoefficient(str, arr, 0.5));
    console.log('[j]', str, '->', compareJaroWinkler(str, arr, 0.7));
});


function compareDiceCoefficient(str, arr, lowerLimit = 0.05) {
    // arr.forEach((x) => console.log('[d]', x, natural.DiceCoefficient(str, x)));
    const reduced = arr.reduce((acc, x) => {
        const dt = natural.DiceCoefficient(str, x);
        if (acc.dt < dt && dt > lowerLimit) {
            acc.dt = dt;
            acc.w = x;
        }
        return acc;
    }, {dt: -Infinity, w: null});
    return reduced.w;
}

function compareJaroWinkler(str, arr, lowerLimit = 0.05) {
    // arr.forEach((x) => console.log('[j]', x, natural.JaroWinklerDistance(str, x, undefined, true)));
    const reduced = arr.reduce((acc, x) => {
        const dt = natural.JaroWinklerDistance(str, x, undefined, true);
        if (acc.dt < dt && dt > lowerLimit) {
            acc.dt = dt;
            acc.w = x;
        }
        return acc;
    }, {dt: -Infinity, w: null});
    return reduced.w;
}
