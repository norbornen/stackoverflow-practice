import jwt_decode from 'jwt-decode';
import WebSocket = require('ws');

class Client {
  private ws: WebSocket;
  private ws_cmd_number = 0;
  constructor(private readonly token: string) {
    this.wsConnect();
  }
  wsConnect() {
    this.ws = new WebSocket('wss://ws.csgorun.pro/connection/websocket');
    this.ws.on('open', this.wsOpenHandler.bind(this));
    this.ws.on('message', this.wsMessageHandler.bind(this));
    this.ws.on('error', this.wsErrorHandler.bind(this));
    this.ws.on('close', this.wsCloseHandler.bind(this));
  }
  wsErrorHandler(...args) {
    console.error('[ws] [error]');
    args.forEach((err) => console.error(`[ws] [error]    ${err}`));
  }
  wsCloseHandler(code) {
    console.error(`[ws] [close]   code=${code}`);
    this.ws.removeAllListeners('open');
    this.ws.removeAllListeners('message');
    this.ws.removeAllListeners('error');
    this.ws.removeAllListeners('close');
    this.ws_cmd_number = 0;
    delete this.ws;
    setTimeout(() => this.wsConnect(), 2000);
  }
  wsOpenHandler() {
    const credentials = { params: { token: this.token } };
    this.wsSend(credentials);
    this.ws.once('message', () => {
      let channels = ['online', 'game', 'bets', 'lottery', 'c-ru', 'medkit'];
      try {
        const decoded: Record<string, any> = jwt_decode(this.token);
        const user_id = decoded?.sub;
        if (user_id) {
          channels = ['u-noty', 'u-ub', 'user-bet', 'u-', 'u-i'].map((x) => `${x}#${user_id}`).concat(channels);
        }
      } catch (err) {
        console.log(err);
      }

      const messages = channels.map((channel) => ({ method: 1, params: { channel } }));
      this.wsSend(...messages);
    })
  }
  wsMessageHandler(data: WebSocket.Data) {
    const messages = data.toString().split('\n');
    messages.map(this.messageHandler.bind(this));
  }
  wsSend(...args: Array<Record<string, any>>) {
    const message = args.map((x) => {
      const o = Object.assign({ id: ++this.ws_cmd_number }, x);
      return JSON.stringify(o);
    }).join(`\n`);
    this.ws?.send(message);
  }
  messageHandler(message: string) {
    if (message === null || message === undefined || !/\S/.test(message)) {
      return;
    }
    try {
      const raw = JSON.parse(message);
      if (!('result' in raw)) {
        console.warn(`[ws] [unhandled message]    ${message}`);
        return;
      }

      const { channel, data } = raw.result;
      switch (channel) {
        case undefined: break;
        default: console.log(`${channel}    ${JSON.stringify(data)}\n`);
      }
    } catch (err) {
      console.error(err);
    }
  }
}

const cl = new Client('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMTkxODc1IiwiaWF0IjoxNjA0NDI4NzA2fQ.UnRI422cVi2eLezoCnMvJJUeylhJMklvxMC16hqVaj8');

