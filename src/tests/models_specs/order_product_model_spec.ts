import { OrderProductsStore } from '../../models/order_products_model';

const store = new OrderProductsStore();


describe('orderProducts model testing', () => {
    

 it('should have a addProductToOrder method', () => {
    expect(store.addProductToOrder).toBeDefined();
  });

  it('should have a deleteProductFromOrder method', () => {
    expect(store.deleteProductFromOrder).toBeDefined();
  });

   it('addProductToOrder method should add product', async () => {
    const result = await store.addProductToOrder(1, 1);
    expect(typeof result).toEqual('object');
  });

  it('deleteProductFromOrder method should delete product from order', async () => {
    const result = await store.deleteProductFromOrder(1, 1);
    expect(typeof result).toEqual('undefined');
  });


})