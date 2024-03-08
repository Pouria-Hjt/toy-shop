import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product/product.service';

@Controller()
export class AppController {
  constructor(private readonly productService: ProductService) {}


  @Get()
  async getAllProducts() {
    return await this.productService.getAllProducts()
  }

  @Get('/:id')
  async getProduct(@Param('id') id: string) {
    return await this.productService.getProduct(id)
  }
}