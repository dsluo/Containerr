// import { OmitType, PartialType } from '@nestjs/mapped-types';
// import { CreateNodeDto } from './create-node.dto';

import { IsOptional, IsUUID } from 'class-validator';

// export class UpdateNodeDto extends PartialType(
//   OmitType(CreateNodeDto, ['id'] as const),
// ) {}

export class UpdateNodeDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsUUID()
  parentId?: string;
}
