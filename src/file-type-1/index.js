// @ts-check
const http = require('http');
const https = require('https');
const { URL } = require('url');
const FileType = require('file-type');

(async () => {
  const urls = [
    'https://random.dog/53d44c97-25bc-4503-9bed-5e9d6bb0e53a.mp4',
    'https://cdn.discordapp.com/emojis/774706529609580586.png?v=1',
    'https://www.youtube.com/',
    'https://cdn.sstatic.net/Sites/ru/img/sprites.svg',
    'https://ru.stackoverflow.com/questions/0/'
  ];
  for (const url of urls) {
    await checkImageByURL(url);
  }
})();

/**
 * @param {string} url
 * @returns {Promise<boolean | null>}
 */
async function checkImageByURL(url) {
  /** @type {boolean | null} */
  let isImage = null;
  try {
    const mimeType = await getMimeTypeByURL(url);
    isImage = mimeType && mimeType.startsWith('image');
    console.log(`url=${url}, mimeType=${mimeType}, isImage=${isImage}`);
  } catch (err) {
    console.error(err);
    console.warn(`url=${url}, mimeType=NULL, isImage=${isImage}`);
  }
  return isImage;
}

/**
 * @param {string} incomingUrl
 * @returns {Promise<string | undefined>}
 */
async function getMimeTypeByURL(incomingUrl) {
  const url = new URL(incomingUrl);

  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error(`PROTOCOL "${url.protocol}" is not supported...`);
  }

  /** @type {http.IncomingMessage} */
  const responseStream = await new Promise(
    (resolve) => (url.protocol === 'https:' ? https : http).get(url, resolve)
  );
  if (responseStream.statusCode !== 200) {
    console.error(`loading fail: ${url}, statusCode=${responseStream.statusCode}`);
    throw new Error(`UNHANDLED RESPONSE STATUS ${responseStream.statusCode}`);
  }

  const responseFileType = await FileType.fromStream(responseStream);
  responseStream.destroy();
  const responseContentType = responseStream.headers['content-type']?.replace(/;\s*charset=.+$/, '');

  return responseFileType
    ? responseFileType.mime
    : responseContentType;
}
