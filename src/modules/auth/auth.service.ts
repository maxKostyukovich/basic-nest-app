import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { User } from '../user/models/user.model';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { JwtPayloadDto } from './dto/jwt-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  public async login(loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.userService.getUserByEmail(loginDto.email, true);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    if (!(await this.isValidUserCredentials(user, loginDto.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload: JwtPayloadDto = { id: user.id };

    return {
      accessToken: this.jwtSign(payload),
    };
  }

  public jwtSign(payload: JwtPayloadDto): string {
    return this.jwtService.sign(payload);
  }

  private async isValidUserCredentials(
    user: Partial<User>,
    loginPassword: string,
  ): Promise<boolean> {
    return user && (await bcrypt.compare(loginPassword, user.password));
  }
}
