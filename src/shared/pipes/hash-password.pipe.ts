import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { AddUserRequestDto } from '../../modules/user/dto/add-user-request.dto';

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  async transform(value: AddUserRequestDto, metadata: ArgumentMetadata) {
    if (value.password) {
      const salt = await bcrypt.genSalt(+process.env.SALT || 10);
      value.password = await bcrypt.hash(value.password, salt);
    }
    return value;
  }
}
