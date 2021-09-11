// @ts-check
const range = require('postgres-range');

const dateRange = '["2018-11-16 00:00:00+03","2019-05-17 00:00:00+03")';

const rng = range.parse(dateRange);

console.log(dateRange);
console.log(rng);
console.log(
  range.serialize({
    lower: '"2018-11-16 00:00:00+03"',
    upper: '"2019-05-17 00:00:00+03"',
  })
);
