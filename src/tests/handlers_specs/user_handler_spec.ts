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

  it('should create user', async () => {
    const response = await request.post('/users').send({
      first_name: 'marina',
      last_name: 'ghattas',
      password: '123'
    });
    expect(response.statusCode).toEqual(200);
  });

  it('should index users', async () => {
    const response = await request
      .get('/users')
      .set('Authorization', 'Bearer ' + token);
    expect(response.statusCode).toEqual(200);
  });

  it('should not index users if not authed', async () => {
    const response = await request.get('/users');
    expect(response.statusCode).toEqual(401);
  });

  it('should show user', async () => {
    const response = await request
      .get('/users/1')
      .set('Authorization', 'Bearer ' + token);
    expect(response.statusCode).toEqual(200);
  });

  it('should not show user if not authed ', async () => {
    const response = await request.get('/users/1');
    expect(response.statusCode).toEqual(401);
  });
});
