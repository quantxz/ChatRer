import * as path from "path"
import { createServer } from "http"
import { Server } from "socket.io"
import routes from "./routes";
import * as express from "express"
import { Request, Response } from "express";
import * as cors from "cors";

class App {
    public server: express.Application;

    constructor() {
        this.server = express();
        this.middleware();
        this.routes();
    }

    private middleware() {
        this.server.use(express.json())
        this.server.use(cors())
        this.server.use(express.urlencoded({ extended: true }));
        this.server.use(express.json())
        this.server.use(express.static(path.join(__dirname, '..', 'public')))
        this.server.set('views', path.join(__dirname, '..' , 'public'));
        this.server.set('view engine', 'ejs');
        this.server.engine('ejs', require('ejs').renderFile);
        this.server.use(routes)
    }

    private routes() {
        this.server.use(routes)
    }
}

const app = new App().server;

export const httpServer = createServer(app);

const io = new Server(httpServer, {
    path: "/socket.io"
});

app.get('/', (req: Request, res: Response) => {
  return res.render('index.ejs')
})

export {
  io,
  httpServer as httpServidor
}
    





