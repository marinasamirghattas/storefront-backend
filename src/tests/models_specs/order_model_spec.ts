import { OrderStore } from '../../models/order_model';
import { UserStore } from '../../models/user_model';
import { ProductStore } from '../../models/product_model';
import bcrypt from 'bcrypt';

const store = new OrderStore();
const testingUser = new UserStore();
const testingProduct = new ProductStore();
 

describe('order model testing', () => {
  ///////beforAll
  beforeAll(async () => {
    await testingUser.create({
      first_name: 'Marina',
      last_name: 'Ghattas',
      password: await bcrypt.hash('777', await bcrypt.genSalt())
    });
    await testingProduct.create({
      id: 1,
      name: 'product',
      price: 1000,
      category: 'category'
    });
  
  });
   
  it('should have a createOrder method', () => {
    expect(store.createOrder).toBeDefined();
  });

  it('should have a addProductToOrder method', () => {
    expect(store.addProductToOrder).toBeDefined();
  });

  it('should have a showCompletedOrders method', () => {
    expect(store.showCompletedOrders).toBeDefined();
  });
  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('createOrder method should create Order', async () => {
    const result = await store.createOrder(1);
    expect(typeof result).toEqual('object');
  });

  it('addProductToOrder method should add product', async () => {
    const result = await store.addProductToOrder(1, 1);
    expect(typeof result).toEqual('object');
  });
  it('showCompletedOrders method should return the completed orders', async () => {
    const result = await store.showCompletedOrders(1);
    expect(typeof result).toEqual('object');
  });
  it('showCurrentOrder method should return the current orders', async () => {
    const result = await store.showCurrentOrder(1);
    expect(typeof result).toEqual('object');
  });
});
