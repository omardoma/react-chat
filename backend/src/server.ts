import http from 'http';
import app from './app';
import io from './io';
import config from './config';

const { PORT } = config;

let server: http.Server;

const listen = (): Promise<void> =>
  new Promise(resolve => server.listen(PORT, resolve));

const unlisten = (): Promise<void> =>
  new Promise((resolve, reject) => {
    server.close((err: Error) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });

async function startServer(): Promise<void> {
  server = http.createServer(app);
  io.attach(server, { serveClient: false });
  await listen();
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
}

async function closeServer(): Promise<void> {
  await unlisten();
  server = null;
}

export { startServer, closeServer };
