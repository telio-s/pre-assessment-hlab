import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class CreateProductDto {
  @IsArray()
  @IsNotEmpty()
  translations: Array<{
    name: string;
    description: string;
    languageCode: string;
  }>;
}

export class SearchProductDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}
