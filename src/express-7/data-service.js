// @ts-check
const { default: fetch } = require('node-fetch');

const cachedData = [];

module.exports.getItems = async (page = 1) => {
  let data = cachedData.find((x) => x.page === page);
  if (!data) {
    try {
      const res = await fetch(`https://reqres.in/api/users?page=${page}`);
      data = await res.json();
      cachedData.push(data);
    } catch (err) {
      console.error(err);
    }
  }
  return data.data;
};
