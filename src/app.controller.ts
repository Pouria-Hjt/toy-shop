import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product/product.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ObjectId } from 'mongoose';

@Controller()
@UseInterceptors(AuthInterceptor)
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