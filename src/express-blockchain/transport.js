const fetch = require('node-fetch');

exports.get = async function(url) {
    const res = await fetch(url);
    return res.json();
};
