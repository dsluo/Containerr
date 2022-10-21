import { IsOptional, IsUUID } from 'class-validator';

export class CreateNodeDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  name: string;

  @IsOptional()
  @IsUUID()
  parentId?: string;
}
