import { server } from './src';

beforeAll(() => {
  server.listen().then(({ url })  => {
    console.log(`🚀  Server ready at ${url}`);
  });
});

afterAll(async () => {
  await server.stop()
});
