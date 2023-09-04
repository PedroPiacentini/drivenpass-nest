import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {

  constructor (private readonly repository: UsersRepository) {}

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

    return user;
  }
  
  async findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number) {
    const user = await this.repository.findOne(id);
    if (!user) throw new HttpException("user not found", HttpStatus.NOT_FOUND);

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
