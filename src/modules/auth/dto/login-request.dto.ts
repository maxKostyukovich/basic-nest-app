import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty()
  @IsEmail()
  public email: string;

  @ApiProperty()
  public password: string;
}
