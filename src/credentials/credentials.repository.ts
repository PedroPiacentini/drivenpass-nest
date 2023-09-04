import { Injectable } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CredentialsRepository {

  constructor (private readonly prisma: PrismaService) {}

  create(createCredentialDto: CreateCredentialDto) {
    return this.db().create({
      data: {...createCredentialDto, userId: 1}
    });
  }

  findAll(userId: number) {
    return this.db().findMany({where: {userId}});
  }

  findOne(id: number) {
    return this.db().findUnique({where: {id}});
  }

  remove(id: number) {
    return this.db().delete({where: {id}});
  }

  db() {
    return this.prisma.credential;
  }
}
