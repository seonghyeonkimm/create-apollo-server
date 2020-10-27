import { prisma } from './context';
import server from './server';

(async () => {
  if (process.env.NODE_ENV === 'test') return;

  const { url, subscriptionsUrl } = await server.listen();
  console.log(`Server ready at ${url} 🚀`);
  console.log(`Subscriptions ready at ${subscriptionsUrl} 🚀`);

  // pm2 graceful start
  process.send && process.send('ready');
})();

process.on('SIGINT', async function () {
  // pm2 graceful stop
  await prisma.$disconnect();
});
