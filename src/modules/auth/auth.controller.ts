import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidationRequestBodyPipe } from '../../shared/pipes/validation-request-body.pipe';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    description: 'Login',
  })
  @ApiResponse({
    type: LoginResponseDto,
  })
  @Post('login')
  public async login(
    @Body(new ValidationRequestBodyPipe<LoginRequestDto>()) loginDto: LoginRequestDto,
  ): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }
}
