import { subscriptionField } from '@nexus/schema';

export const productAdded = subscriptionField('productAdded', {
  type: 'Product',
  subscribe: (_, args, { pubsub }) => pubsub.asyncIterator([PRODUCT_ADDED]),
  resolve: (payload) => {
    return payload;
  },
});

// Subscription event labels
export const PRODUCT_ADDED = 'PRODUCT_ADDED';
