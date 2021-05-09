// @ts-check
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const goodreads = require('goodreads-api-node');

const goodreadCredentials = {
    key: '2hsiYIWd4IgtemATVT3uzA',
    secret: 'YfbMFQePpBQ4Dz3AqWc6SeAv8qtvWL89vJ8AXQgMxc'
};

let browser;

(async () => {

  try {
    const bookname = 'Башня ласточки';
    const goodreadBooks = await goodreadSearchBooks(bookname);

    browser = await puppeteer.launch({
      headless: true
    });

    for (const book of goodreadBooks) {
      const something = await Search(book);
      console.log(something);
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  if (browser) {
    await browser.close();
  }

})();

async function goodreadSearchBooks(search) {
  const gr = goodreads(goodreadCredentials);

  const res = await gr.searchBooks({
    q: search,
    page: 1,
    field: 'all'
  });

  const books = (res.search.results.work || []).reduce((acc, w) => {
    const best_book = w.best_book;
    if (best_book) {
      acc.push({
        id: best_book.id._,
        title: best_book.title
      });
    }
    return acc;
  }, []);

  return books
}

async function Search(book) {
  let title = book.title;
  title = title.split('(')[0].split('/')[0];

  const [ librariusBooks, labirintBooks ] = await Promise.all([
    librariusSearch(title),
    labirintSearch(title)
  ]);

  return { librariusBooks, labirintBooks };
}

async function librariusSearch(title) {
  const url = `https://librarius.md/ru/search?search=${title}`;
  const content = await loadPage(url);
  const $ = cheerio.load(content);

  const books = [];
  $('.book__title').slice(4, 36).each((idx, elem) => {
    let titles = $(elem).text();
    books.push({ titles });
  });
  $('.book__price').slice(4, 36).each((idx, elem) => {
    let price = $(elem).text()
    price = price.substring(price.indexOf("\n") + 1);
    price = price.replace(/\s/g, "");
    books[idx].price = price;
  });

  return books;
}

async function labirintSearch(title) {
  const url = `https://www.labirint.ru/search/${title}/`;
  const content = await loadPage(url);
  const $ = cheerio.load(content);

  const books = [];
  $('.product-title').slice(4, 36).each((idx, elem) => {
    let titles = $(elem).text();
    books.push({ titles });
  });
  $('.price-val').slice(4, 36).each((idx, elem) => {
    let price = $(elem).text()
    price = price.substring(price.indexOf("\n") + 1);
    price = price.replace(/\s/g, "");
    books[idx].price = price;
  });

  return books;
}

async function loadPage(url) {
  const page = await browser.newPage();
  await page.goto(url);
  return page.content();
}
