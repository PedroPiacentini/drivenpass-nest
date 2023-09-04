import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersRepository {

  constructor (private readonly prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.db().create({
      data: createUserDto
    });
  }

  findByEmail(email: string) {
    return this.db().findUnique({where: {email}});
  }

  remove(id: number) {
    return this.db().delete({where: {id}});
  }

  db() {
    return this.prisma.user;
  }
}
