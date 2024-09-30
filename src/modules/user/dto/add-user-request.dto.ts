import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class AddUserRequestDto {
  @ApiProperty()
  @IsEmail()
  public email: string;

  @ApiProperty()
  @IsStrongPassword()
  public password: string;

  @ApiProperty()
  @IsString()
  public fullName: string;
}
