import { ProductStore } from '../../models/product_model';

const store = new ProductStore();

describe('product model testing', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('create method should add a product', async () => {
    const result = await store.create({
      name: 'samsung A50',
      price: 7000,
      category: 'mobiles'
    });
    expect(typeof result).toEqual('object');
  });

  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect(typeof result).toEqual('object');
  });
  it('show method should return the correct product', async () => {
    const result = await store.show(1);
    expect(typeof result).toEqual('object');
  });
});
