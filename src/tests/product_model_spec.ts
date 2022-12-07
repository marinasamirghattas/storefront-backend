import { ProductStore, Product } from "../models/product_model";

const store = new ProductStore()

describe('product model testing', () => {

    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.index).toBeDefined();
      });
      
    it('should have a delete method', () => {
        expect(store.index).toBeDefined();
    });


    it('create method should add a product', async () => {
        const result = await store.create({
            name: 'samsung A50',
            price: 7000,
            category: 'mobiles',
        });
        expect(result).toEqual({
            id: 1,
            name: 'samsung A50',
            price: 7000,
            category: 'mobiles',
        });
      });



    it('index method should return a list of products', async () => {
        const result = await store.index();
        expect(result).toEqual([{
          id: 1,
          name: 'samsung A50',
            price: 7000,
            category: 'mobiles',
        }]);
      });
      it('show method should return the correct product', async () => {
        const result = await store.show(1);
        expect(result).toEqual({
            id:1,
            name: 'samsung A50',
            price: 7000,
            category: 'mobiles',
        });
      });
      it('delete method should remove the product', async () => {
        store.delete(1);
        const result = await store.index()
        expect(result).toEqual([]);
      });

});