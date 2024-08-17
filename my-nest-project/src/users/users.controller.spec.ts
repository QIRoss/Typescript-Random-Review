import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from './users.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer()).get('/users').expect(200).expect([]);
  });

  it('/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({ name: 'John Doe', age: 30 })
      .expect(201)
      .expect((res) => {
        expect(res.body).toMatchObject({ name: 'John Doe', age: 30 });
      });
  });

  it('/users/:id (GET)', async () => {
    const res = await request(app.getHttpServer())
      .post('/users')
      .send({ name: 'Jane Doe', age: 25 });

    const id = res.body.id;

    return request(app.getHttpServer())
      .get(`/users/${id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.name).toBe('Jane Doe');
        expect(res.body.age).toBe(25);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
