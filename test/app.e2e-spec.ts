import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /health', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect("I'm okay!");
  });

  it('POST /users/register', () => {

    const userDto: CreateUserDto = {
      email: "teste@teste.com",
      password: "Teste1234!"
    }

    return request(app.getHttpServer())
      .post('/users/register')
      .send(userDto)
      .expect(201)
  })

  it('POST /users/login', () => {

    const userDto: CreateUserDto = {
      email: "teste@teste.com",
      password: "Teste1234!"
    }

    return request(app.getHttpServer())
      .post('/users/login')
      .send(userDto)
      .expect(200)
  })
});

