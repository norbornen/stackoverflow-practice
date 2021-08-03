// @ts-check
const { default: axios } = require('axios');
const { parseStringPromise } = require('xml2js');

getLinks('https://leroymerlin.ru/sitemap-10.xml')
  .then(console.log)
  .catch(console.error);

async function getLinks(url) {
  const { data: sitemapData } = await axios.get(url);
  const parsedSitemapData = await parseStringPromise(sitemapData);

  const items = parsedSitemapData?.urlset?.url;
  if (items) {
    return (Array.isArray(items) ? items : [items]).map(
      (x) => x.loc || []
    ).flat();
  }
}
