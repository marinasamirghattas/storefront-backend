import supertest from 'supertest';
import { app } from '../../server';
import { UserStore } from '../../models/user_model';
import bcrypt from 'bcrypt';

const testingUser = new UserStore();
const request = supertest(app);

describe('user handler test', () => {
  let token: unknown;
  beforeAll(async () => {
    testingUser.create({
      first_name: 'Marina',
      last_name: 'Ghattas',
      password: await bcrypt.hash('777', await bcrypt.genSalt())
    });
    const response = await request.post('/users/login').send({
      firstname: 'Marina',
      password: '777'
    });
    token = response.body;
    console.log(token, 'token');
    console.log(response.body, 'body');
  });

  it('should create product', async () => {
    const response = await request
      .post('/products')
      .send({
        name: 'marina',
        price: 10000,
        category: 'cat'
      })
      .set('Authorization', 'Bearer ' + token);
    expect(response.statusCode).toEqual(200);
  });

  it('should not create product if not authed', async () => {
    const response = await request.post('/products').send({
      name: 'prd',
      price: 10000,
      category: 'cat'
    });
    expect(response.statusCode).toEqual(401);
  });

  it('should index products', async () => {
    const response = await request.get('/products');
    expect(response.statusCode).toEqual(200);
  });

  it('should show products by category', async () => {
    const response = await request.get('/products/category/cat');
    expect(response.statusCode).toEqual(200);
  });

  it('should show product', async () => {
    const response = await request.get('/products/1');
    expect(response.statusCode).toEqual(200);
  });
});
