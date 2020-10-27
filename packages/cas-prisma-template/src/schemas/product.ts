import { inputObjectType, objectType } from "@nexus/schema";

export const ProductOption = objectType({
  name: 'ProductOption',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.productId();
  },
});

export const ProductTag = objectType({
  name: 'ProductTag',
  definition(t) {
    t.model.id();
    t.model.name();
  },
});

export const Product = objectType({
  name: 'Product',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.tags();
    t.model.options();
  },
});

export const ProductConnection = objectType({
  name: 'ProductConnection',
  definition(t) {
    t.int('cursor');
    t.field('results', { type: 'Product', nullable: false, list: [true] });
  },
});

export const ProductOptionInput = inputObjectType({
  name: 'ProductOptionInput',
  definition(t) {
    t.int('id');
    t.int('productId');
    t.string('name', { nullable: false });
  },
});

export const TagInput = inputObjectType({
  name: 'TagInput',
  definition(t) {
    t.int('id');
    t.string('name', { nullable: false });
  },
});

export const ProductInput = inputObjectType({
  name: 'ProductInput',
  definition(t) {
    t.string('name', { nullable: false });
    t.field('tags', { type: TagInput, list: [true] });
    t.field('options', { type: ProductOptionInput, list: [true] });
  },
});