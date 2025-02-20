import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Auth System', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', () => {
    const email = 'unique1@uni.com';
    const name = 'Alaa';
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, name, password: '1234' })
      .expect(201)
      .then((res) => {
        const { id, email: returnedEmail, name: returnedName } = res.body;
        expect(id).toBeDefined();
        expect(returnedEmail).toBe(email);
        expect(returnedName).toBe(name);
      });
  });

  it('signup as a new user then get the currently logged in user', async () => {
    const email = 'tawfik@gmail.com';
    const name = 'tawfik';
    const res = await request(app.getHttpServer())
    .post('/auth/signup')
    .send({email, name, password: '1234' })
    .expect(201)

    const cookie = res.get('Set-Cookie')

    const {body} = await request(app.getHttpServer())
    .get('/auth/whoami')
    .set("Cookie" , cookie)
    .expect(200)

    expect(body.email).toBe(email)
  });
});
