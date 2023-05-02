// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Widget, Category, CartProduct, Product, OrderProduct, Order, PaymentIntent } = initSchema(schema);

export {
  Widget,
  Category,
  CartProduct,
  Product,
  OrderProduct,
  Order,
  PaymentIntent
};