import app from './app';
import { Server } from 'http';
import { PrismaClient } from '@prisma/client';
import config from './app/config';

const prisma = new PrismaClient();
let server: Server;

async function main() {
  try {
    await prisma.$connect();

    server = app.listen(config.port, () => {
      console.log(`App listening on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to connect to DB', error);
  }
}

main();

process.on('unhandledRejection', () => {
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`😁 uncaughtException is detected, shutting down ...`);
  process.exit(1);
});