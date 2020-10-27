/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

import * as Context from "../context"
import { core } from "@nexus/schema"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    date<FieldName extends string>(fieldName: FieldName, opts?: core.ScalarInputFieldConfig<core.GetGen3<"inputTypes", TypeName, FieldName>>): void // "Date";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Date";
  }
}
declare global {
  interface NexusGenCustomOutputProperties<TypeName extends string> {
    model: NexusPrisma<TypeName, 'model'>
    crud: any
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  ProductInput: { // input type
    name: string; // String!
    options?: NexusGenInputs['ProductOptionInput'][] | null; // [ProductOptionInput!]
    tags?: NexusGenInputs['TagInput'][] | null; // [TagInput!]
  }
  ProductOptionInput: { // input type
    id?: number | null; // Int
    name: string; // String!
    productId?: number | null; // Int
  }
  ProductOptionWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  ProductTagWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  TagInput: { // input type
    id?: number | null; // Int
    name: string; // String!
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  Date: any
  Upload: any
}

export interface NexusGenRootTypes {
  Mutation: {};
  Product: { // root type
    id: number; // Int!
    name: string; // String!
  }
  ProductConnection: { // root type
    cursor?: number | null; // Int
    results: NexusGenRootTypes['Product'][]; // [Product!]!
  }
  ProductOption: { // root type
    id: number; // Int!
    name: string; // String!
    productId: number; // Int!
  }
  ProductTag: { // root type
    id: number; // Int!
    name: string; // String!
  }
  Query: {};
  Subscription: {};
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  ProductInput: NexusGenInputs['ProductInput'];
  ProductOptionInput: NexusGenInputs['ProductOptionInput'];
  ProductOptionWhereUniqueInput: NexusGenInputs['ProductOptionWhereUniqueInput'];
  ProductTagWhereUniqueInput: NexusGenInputs['ProductTagWhereUniqueInput'];
  TagInput: NexusGenInputs['TagInput'];
  String: NexusGenScalars['String'];
  Int: NexusGenScalars['Int'];
  Float: NexusGenScalars['Float'];
  Boolean: NexusGenScalars['Boolean'];
  ID: NexusGenScalars['ID'];
  Date: NexusGenScalars['Date'];
  Upload: NexusGenScalars['Upload'];
}

export interface NexusGenFieldTypes {
  Mutation: { // field return type
    createProduct: NexusGenRootTypes['Product'] | null; // Product
  }
  Product: { // field return type
    id: number; // Int!
    name: string; // String!
    options: NexusGenRootTypes['ProductOption'][]; // [ProductOption!]!
    tags: NexusGenRootTypes['ProductTag'][]; // [ProductTag!]!
  }
  ProductConnection: { // field return type
    cursor: number | null; // Int
    results: NexusGenRootTypes['Product'][]; // [Product!]!
  }
  ProductOption: { // field return type
    id: number; // Int!
    name: string; // String!
    productId: number; // Int!
  }
  ProductTag: { // field return type
    id: number; // Int!
    name: string; // String!
  }
  Query: { // field return type
    products: NexusGenRootTypes['ProductConnection'] | null; // ProductConnection
  }
  Subscription: { // field return type
    productAdded: NexusGenRootTypes['Product'] | null; // Product
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createProduct: { // args
      input: NexusGenInputs['ProductInput']; // ProductInput!
    }
  }
  Product: {
    options: { // args
      after?: NexusGenInputs['ProductOptionWhereUniqueInput'] | null; // ProductOptionWhereUniqueInput
      before?: NexusGenInputs['ProductOptionWhereUniqueInput'] | null; // ProductOptionWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
    tags: { // args
      after?: NexusGenInputs['ProductTagWhereUniqueInput'] | null; // ProductTagWhereUniqueInput
      before?: NexusGenInputs['ProductTagWhereUniqueInput'] | null; // ProductTagWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "Mutation" | "Product" | "ProductConnection" | "ProductOption" | "ProductTag" | "Query" | "Subscription";

export type NexusGenInputNames = "ProductInput" | "ProductOptionInput" | "ProductOptionWhereUniqueInput" | "ProductTagWhereUniqueInput" | "TagInput";

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Boolean" | "Date" | "Float" | "ID" | "Int" | "String" | "Upload";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: Context.TContext;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
}