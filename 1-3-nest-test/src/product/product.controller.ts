import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { CreateProductDto, SearchProductDTO } from '../dto/index';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('create')
  createProduct(@Body() dto: CreateProductDto) {
    return this.productService.createProduct(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('search')
  searchProduct(
    @Body() dto: SearchProductDTO,
    @Query() queryString: { page: number; limit: number },
  ) {
    return this.productService.searchProduct(dto, queryString);
  }
}
