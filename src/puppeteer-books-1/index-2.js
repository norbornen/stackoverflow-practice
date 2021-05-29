const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

test('Ведьмак');

async function test(name) {
  try {
    const url = 'https://librarius.md/ru/search?search=';
    const librOpts = {
      titleOpts: {
        elType: 'title',
        sel: '.card-title'
      },
      priceOpts: {
        elType: 'price',
        sel: '.card-price',
        valute: 'лей'
      }
    };
    const books = await getBooks(name, url, librOpts);
    console.log(books);
  } catch (err) {
    console.error(err);
  }
}

async function getBooks(name, url, opts) {
  const content = await getPageContent(`${url}${name}`);
  const $ = cheerio.load(content);
  const books = [];
  const titles = await getElements($, opts.titleOpts.sel, opts.titleOpts);
  const prices = await getElements($, opts.priceOpts.sel, opts.priceOpts);
  for (let i = 0; i < titles.length - 1; i++) {
    books.push(
      `${books}|${titles[i].id + 1}| ${titles[i].title} - ${prices[i]?.price || 'n/a'}`
    );
  }
  return books;
}

async function getPageContent(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const content = await page.content();
  await browser.close();
  return content;
}

async function getElements($, sel, options) {
  const elements = [];
  // проходимся по всем элементам масива по селектору(sel)
  $(sel).each((idx, elem) => {
    const nodeItem = options.isParent ? $(elem).parent() : $(elem);
    if (options.elType === 'title') {
      const title = nodeItem.text();
      const obj = {
        id: idx,
        title,
      };
      elements.push(obj);
    }
    if (options.elType === 'price') {
      let price = nodeItem.text()?.trim().replace(/\s/g, '');
      if (price === '-' || price === '') {
        price = 'Нет в продаже';
      } else if (options.valute === 'руб') {
        price = `${price} руб`;
      }
      elements.push({ id: idx, price });
    }
    if (options.elType === 'url') {
      let obj;
      const url = nodeItem.attr('href');
      if (!url.startsWith(options.siteURL)) {
        obj = {
          id: idx,
          url: `${options.siteURL}${url}`,
        };
      } else {
        obj = {
          id: idx,
          url,
        };
      }
      elements.push(obj);
    }
  });

  return elements;
}
