import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {

  constructor (
    private readonly jwtService: JwtService,
    private readonly repository: UsersRepository
    ) {}

  async register(createUserDto: CreateUserDto) {
    const {email} = createUserDto;
    const user = await this.repository.findByEmail(email);
    if (user) throw new HttpException("User with this email already exists", HttpStatus.CONFLICT);

    return this.repository.create(createUserDto);
  }

  async login(createUserDto: CreateUserDto) {
    const {email, password} = createUserDto
    const user = await this.repository.findByEmail(email);
    if (!user) throw new HttpException("Wrong email or password", HttpStatus.UNAUTHORIZED);

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new HttpException("Wrong email or password", HttpStatus.UNAUTHORIZED);

    return this.createToken(user);
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }

  createToken(user: User) {
    const {email, id} = user;
    const token = this.jwtService.sign(
      {email, id}, 
      {subject: String(id)}
    )

    return {token};
  }
}
