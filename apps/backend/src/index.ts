import app from './app';
import { prisma } from './prismaClient';

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});

const shutdown = async (): Promise<void> => {
  console.log('Gracefully shutting down...');
  await prisma.$disconnect();
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
