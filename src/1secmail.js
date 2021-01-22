// @ts-check
const { default: fetch } = require('node-fetch');
const { URL, URLSearchParams } = require('url');

const sleep = (timeout = 1000) => new Promise((r) => setTimeout(r, timeout));

/**
 * @param {string} email
 * @param {'template' | 'reg'} [typeLink='reg']
 */
async function getLinkToConfirmRegistration(email, typeLink = 'reg') {
  const client = new OneSecMailClient(email);
  
  let count = 100;
  let messages;
  while (count--) {
    try {
      messages = await client.action('getMessages');
      if (messages && Array.isArray(messages) && messages.length > 0) {
        break;
      }
      await sleep();
    } catch (err) {
      console.error(err);
    }
  }

  let lastMessage;
  if (messages && Array.isArray(messages) && messages.length > 0) {
    lastMessage = await client.action('readMessage', { id: messages[0].id });
  }
  if (!lastMessage) {
    throw new Error(`Emails are not sent`);
  }

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

  const email = 'ldus7o76uq@esiix.com';
  await getLinkToConfirmRegistration(email, 'reg');

})();
