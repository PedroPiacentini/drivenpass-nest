import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersRepository {

  constructor (private readonly prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.db().create({
      data: {
        ...createUserDto, 
        password: bcrypt.hashSync(createUserDto.password, 10)
      }
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
