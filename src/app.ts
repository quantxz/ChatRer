import express from "express";
import { Response, Request } from "express"
import path from "path"
import { createServer } from "http"
import { Server } from "socket.io"
import routes from "./routes";

const app = express();


//configura o servidor para permitir entrada de dados via formulario
app.use(express.urlencoded({ extended: true }));

app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'public')))
app.set('views', path.join(__dirname, '..' , 'public'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(routes)

export const httpServer = createServer(app);

const io = new Server(httpServer, {
    path: "/socket.io"
});

app.get('/', (req: Request, res: Response) => {
  res.render('index.ejs')
})

export {
  io,
  httpServer as httpServidor
}
    





