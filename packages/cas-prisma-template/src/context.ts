import { PrismaClient } from '@prisma/client';
import { PubSub } from 'apollo-server';

import type { TDatasource } from './datasources';

export type TContext = {
  pubsub: PubSub;
  prisma: PrismaClient;
  dataSources: TDatasource;
};

export const prisma = new PrismaClient({
  log: process.env.NODE_ENV ? undefined : ['query', 'info', 'warn', 'error'],
});

const pubsub = new PubSub();

export default async () => {
  return {
    prisma,
    pubsub,
  };
};
