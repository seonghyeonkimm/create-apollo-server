/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataSource, DataSourceConfig } from 'apollo-datasource';

import { TContext } from '../context';

class BaseDataSource extends DataSource<TContext> {
  protected context: TContext | undefined;

  initialize(config: DataSourceConfig<TContext>) {
    this.context = config.context;
  }

  static connectOrCreate(data?: Record<string, any>[] | null) {
    return data?.reduce(
      (result, item) => {
        const { id, ...rest } = item;
        if (item.id) {
          result.connectOrCreate.push({
            create: rest,
            where: { id },
          });
        } else {
          result.create.push(item);
        }

        return result;
      },
      { connectOrCreate: [], create: [] } as Record<string, any>,
    );
  }
}

export default BaseDataSource;
