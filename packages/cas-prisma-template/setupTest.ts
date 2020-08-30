import { server } from './src/server';

beforeAll(() => {
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
});

afterAll(async () => {
  await server.stop();
});
