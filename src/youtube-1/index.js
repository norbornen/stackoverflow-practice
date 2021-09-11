// @ts-check
const search = require('youtube-search');

/** @type {search.YouTubeSearchOptions} */
const opts = {
  maxResults: 10,
  key: 'AIzaSyALTsN37OKneqTEQskMWVLb32Cumv-3bGc'
};

search('музыка', opts, (err, results) => {
  console.log('a');
  if (err) return console.log(err);

  console.dir(results);
});
console.log('b');
