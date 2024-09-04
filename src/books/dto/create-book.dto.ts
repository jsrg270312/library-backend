import { IsInt, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  author: string;
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  title: string;
  @IsInt()
  quantity: number;
}
