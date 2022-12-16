import supertest from 'supertest';
import { app } from '../../server';
import { UserStore } from '../../models/user_model';
import bcrypt from 'bcrypt';

const testingUser = new UserStore();
const request = supertest(app);

describe('order handler test', () => {
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

  it('should create order', async () => {
    const response = await request
      .post('/orders/create')
      .send({
        user_id: 1,
        order_status: 'active'
      })
      .set('Authorization', 'Bearer ' + token);
    expect(response.statusCode).toEqual(200);
  });

  it('should not create order if not authed', async () => {
    const response = await request.post('/orders/create').send({
      user_id: 1,
      order_status: 'active'
    });
    expect(response.statusCode).toEqual(401);
  });

  // it('should add products to order', async () => {
  //   const response = await request
  //     .post('/orders/addProduct')
  //     .send({
  //       product_id: 1,
  //       order_id: 1
  //     })
  //     .set('Authorization', 'Bearer ' + token);
  //   expect(response.statusCode).toEqual(200);
  // });

  // it('should not add products to order if not authed', async () => {
  //   const response = await request.post('/orders/addProduct').send({
  //     product_id: 1,
  //     order_id: 1
  //   });
  //   expect(response.statusCode).toEqual(401);
  // });

  it('should show Completed Orders', async () => {
    const response = await request
      .get('/orders/completed/1')
      .set('Authorization', 'Bearer ' + token);
    expect(response.statusCode).toEqual(200);
  });

  it('should not show Completed Orders if not authed', async () => {
    const response = await request.get('/orders/completed/1');
    expect(response.statusCode).toEqual(401);
  });

  it('should show current Orders', async () => {
    const response = await request
      .get('/orders/1')
      .set('Authorization', 'Bearer ' + token);
    expect(response.statusCode).toEqual(200);
  });

  it('should not show current Orders if not authed', async () => {
    const response = await request.get('/orders/1');
    expect(response.statusCode).toEqual(401);
  });
});
