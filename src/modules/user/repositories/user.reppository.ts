import { User } from '../models/user.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  public async createUser(user: Partial<User>): Promise<User> {
    return await this.userModel.create(user);
  }

  public async findUserById(id: number): Promise<User | null> {
    return await this.userModel.findByPk(id);
  }

  public async findUserByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ where: { email } });
  }
}
