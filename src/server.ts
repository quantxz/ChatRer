import * as express from "express";
import { Response, Request } from "express"
import * as path from "path"
import { createServer } from "http"
import { Server } from "socket.io"

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')))
app.set('views', path.join(__dirname, '..' , 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');



export const httpServer = createServer(app);

const io = new Server(httpServer, {
    path: "/socket.io"
});

app.get('/', (req: Request, res: Response) => {
  res.render('index.html')
})

export {
  io,
  httpServer as httpServidor
}
    





