// @ts-check
const pRetry = require('p-retry');
const { default: fetch } = require('node-fetch');
const { URL, URLSearchParams } = require('url');

const sleep = (timeout = 1000) => new Promise((r) => setTimeout(r, timeout));

/**
 * @param {string} email
 * @param {'template' | 'reg'} [typeLink='reg']
 */
async function getLinkToConfirmRegistration(email, typeLink = 'reg') {
  const client = new OneSecMailClient(email);

  const messages = await pRetry(
    async () => {
      const list = await client.action('getMessages');
      return Array.isArray(list) && list.length > 0 ? list : Promise.reject(new Error('Emails are not sent'));
    },
    {
      retries: 100,
      factor: 1
    }
  );

  const lastMessage = await client.action('readMessage', { id: messages[0].id });
  console.log(lastMessage.textBody);
}

class OneSecMailClient {
  #endpoint = 'https://www.1secmail.com/api/v1/';
  #login
  #domain

  /**
   * @param {string} email
   * @memberof OneSecMailClient
   */
  constructor(email) {
    [ this.#login, this.#domain ] = email.split('@');
  }

  async action(actionName, param = {}) {
    const url = new URL(this.#endpoint);
    url.search = new URLSearchParams({
      action: actionName,
      login: this.#login,
      domain: this.#domain,
      ...param
    }).toString();

    const res = await fetch(
      url.toString(),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (!res.ok) {
      throw new Error(res.statusText || `Status: ${res.status}`);
    }

    return res.json();
  }
}


(async () => {

  const email = 'ldus9o76uq@esiix.com';
  await getLinkToConfirmRegistration(email, 'reg');

})();
