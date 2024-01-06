import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { RegisterUserDto } from './dto/ register-user.dto';
import { User } from './entities/User.entity';

@Injectable()
export class UserService {
  private logger = new Logger();

  @InjectRepository(User)
  private userRepository: Repository<User>;

  async register(user: RegisterUserDto) {}
}
