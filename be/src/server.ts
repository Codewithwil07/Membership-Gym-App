import { App } from "./app";

const port = Number(process.env.PORT);

const server = new App();
server.listen(port);
