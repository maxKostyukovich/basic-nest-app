import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { ValidationRequestBodyPipe } from '../../shared/pipes/validation-request-body.pipe';
import { AddUserRequestDto } from './dto/add-user-request.dto';
import { ApiCreatedResponse, ApiHeader, ApiOperation } from '@nestjs/swagger';
import { HashPasswordPipe } from '../../shared/pipes/hash-password.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtPayloadDto } from '../auth/dto/jwt-payload.dto';
import { AddUserResponseDto } from './dto/add-user-response.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    description: 'Create new user',
  })
  @ApiCreatedResponse({
    type: AddUserResponseDto,
  })
  @Post()
  public async addUser(
    @Body(new ValidationRequestBodyPipe<AddUserRequestDto>(), new HashPasswordPipe())
    userDto: AddUserRequestDto,
  ): Promise<AddUserResponseDto> {
    return this.userService.addUser(userDto);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'JWT auth',
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  public async getUserById(@Request() req: { user: JwtPayloadDto }) {
    return this.userService.getUser(req.user);
  }
}
