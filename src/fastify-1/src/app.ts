import path from 'path';
import fastify, { FastifyError, FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import pointOfView from 'point-of-view';
import { Server } from 'socket.io';
import ejs from 'ejs';

export interface IApi {
  port?: number;
  ip?: string;
};

export default class ApiWorker {
  private readonly port: number;
  private readonly ip: string;
  private app: FastifyInstance;
  private io: Server;

  constructor(data: IApi = {}) {
    this.app = fastify();
    this.port = data?.port;
    this.ip = data?.ip;
    this.io = new Server(this.app.server);
  }

  start() {

    this.app.register(pointOfView, {
      engine: {
        ejs
      },
      includeViewExtension: true,
      root: path.join(__dirname, '../views')
    })

    this.app.get('/test', async (req: FastifyRequest, res: FastifyReply) => {
      res.view('index')
    })

    this.app.listen(this.port, this.ip, (err: any) => {
      if (err) {
        console.log(err);
        throw err;
      }
      console.log(`server listening on ${this.port}`)
    });

  }
}
