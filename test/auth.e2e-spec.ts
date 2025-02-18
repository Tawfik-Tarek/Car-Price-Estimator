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
});
