// @ts-check

async function fn(obj = {}) {
  return Promise.resolve({ date: Date.now() });
}

module.exports = fn;

