import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.reppository';
import { User } from './models/user.model';
import { AddUserRequestDto } from './dto/add-user-request.dto';
import { JwtPayloadDto } from '../auth/dto/jwt-payload.dto';
import { AuthService } from '../auth/auth.service';
import { AddUserResponseDto } from './dto/add-user-response.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  public async getUserByEmail(
    email: string,
    withPassword: boolean = false,
  ): Promise<Partial<User>> {
    const user = await this.userRepository.findUserByEmail(email);

    const { password, ...rest } = user;

    return withPassword ? user : rest;
  }

  public async getUser(jwtPayload: JwtPayloadDto): Promise<Partial<User>> {
    const { email, id, fullName } = await this.userRepository.findUserById(jwtPayload.id);

    return {
      id,
      email,
      fullName,
    };
  }

  public async addUser(user: AddUserRequestDto): Promise<AddUserResponseDto> {
    const existUser = await this.userRepository.findUserByEmail(user.email);
    if (existUser) {
      throw new BadRequestException(`User with email ${user.email} is already exist`);
    }

    const newUser = await this.userRepository.createUser(user);

    return {
      id: newUser.id,
      accessToken: this.authService.jwtSign({ id: newUser.id }),
    };
  }
}
