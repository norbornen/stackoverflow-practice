const fetch = require('node-fetch');

// const ratesCache = {};
// const ratesCacheValid = 3 * 60 * 1000;

// module.exports = async function getRates(path, cacheKey = path) {
//     const cache = ratesCache[cacheKey];
//     const dt = Date.now();
//     if (!cache || (dt - cache.dt) > ratesCacheValid) {
//         const res = await fetch(path);
//         const data = await res.json();
//         ratesCache[cacheKey] = { dt, data };
//     }
//     return ratesCache[cacheKey];
// }


let ratesCache = [];

module.exports = async function getRates(path, cacheName) {
    const s = 1000,
        m = s * 60,
        h = m * 60,
        d = h * 24,
        tm = Date.now(),
        findObj = (field) => {
            const o = ratesCache.find(obj => obj.name === cacheName);
            if (o) {
                return o[field];
            }
        };
    const q = typeof undefined

    if (typeof ratesCache[cacheName] !== undefined && findObj('tm') !== undefined && tm - findObj('tm') <= m * 3) {
        return findObj('data');
    }

    const res = await fetch(path),
        data = await res.json();

    ratesCache.push({ name: cacheName, tm, data });

    return data;
}
