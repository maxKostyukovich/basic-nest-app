import { ApiProperty } from '@nestjs/swagger';

export class AddUserResponseDto {
  @ApiProperty()
  public id: number;

  @ApiProperty()
  public accessToken: string;
}
