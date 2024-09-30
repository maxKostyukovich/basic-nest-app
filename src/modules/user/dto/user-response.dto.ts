import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty()
  public id: number;

  @ApiProperty()
  public email: string;

  @ApiProperty()
  public fullName: string;
}
