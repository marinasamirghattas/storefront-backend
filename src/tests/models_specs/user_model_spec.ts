import { UserStore } from '../../models/user_model';

const store = new UserStore();
const hashedPassword =
  '$2b$10$CzRjTy2cTS/QhxphT2r8we8/2eRc37i0w/OphTrzu8LraMfUANa.e';

describe('user model testing', () => {
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

  it('create method should add a user', async () => {
    const result = await store.create({
      first_name: 'Marina',
      last_name: 'Ghattas',
      password: hashedPassword
    });
    expect(typeof result).toEqual('object');
  });
  it('index method should return a list of users', async () => {
    const result = await store.index();
    expect(typeof result).toEqual('object');
  });
  it('show method should return the correct user', async () => {
    const result = await store.show(1);
    expect(typeof result).toEqual('object');
  });
});
