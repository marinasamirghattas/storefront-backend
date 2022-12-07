import { UserStore, User } from "../models/user_model";

const store = new UserStore()

describe('user model testing', () => {

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


    it('create method should add a user', async () => {
        const result = await store.create({
            first_name: 'Marina',
            last_name: 'Ghattas',
            password: '333',
        });
        expect(result).toEqual({
            id: 1,
            first_name: 'Marina',
            last_name: 'Ghattas',
            password: '333',
        });
      });
    it('index method should return a list of users', async () => {
        const result = await store.index();
        expect(result).toEqual([{
          id: 1,
          first_name: 'Marina',
          last_name: 'Ghattas',
          password: '333'
        }]);
      });
      it('show method should return the correct user', async () => {
        const result = await store.show(1);
        expect(result).toEqual({
            id:1,
          first_name: 'Marina',
          last_name: 'Ghattas',
          password: '333',
        });
      });
      it('delete method should remove the user', async () => {
        store.delete(1);
        const result = await store.index()
        expect(result).toEqual([]);
      });

});