import './config';

// Important: Don't place any imports above the config import as they use environment variables that needs to be loaded first
import { startServer, closeServer } from './server';

async function gracefulShutdown(signal: string): Promise<void> {
  console.log(signal);
  console.log('Gracefully stopping... (press Ctrl+C again to force)');
  try {
    await closeServer();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

function catchTermination(): void {
  process.once('SIGUSR2', () => process.kill(process.pid, 'SIGUSR2')); // For nodemon graceless restarts
  const signals = ['SIGHUP', 'SIGINT', 'SIGTERM', 'SIGQUIT'];
  signals.forEach((signal: any) => process.once(signal, gracefulShutdown));
}

(async function main(): Promise<void> {
  try {
    await startServer();
    catchTermination();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
