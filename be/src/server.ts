
import { App } from "./app";
import dotenv from 'dotenv'
dotenv.config()


const port = Number(process.env.PORT);


const server = new App();
server.listen(port);
