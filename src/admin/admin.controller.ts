import { Controller, Get, Patch, Post, Delete, Param, Body } from '@nestjs/common';
import { CreateProductDTO } from 'src/dto/create-product.dto';
import { ProductService } from 'src/product/product.service';


@Controller('admin')
export class AdminController {
    constructor(
        private readonly productService: ProductService) {}

    @Get('products')
    async getAllProducts() {
        return await this.productService.getAllProducts()
    }

    @Get('product/:id') 
    async getProduct(@Param('id') id: string) {
        return await this.productService.getProduct(id)
    }

    @Post('product/')
    async addProduct(@Body() createProductDTO: CreateProductDTO) {
        return await this.productService.addProduct(createProductDTO)
    }

    @Delete('product/:id')
    async deleteProduct(@Param('id') id: string) {
        return await this.productService.deleteProduct(id)
    }

    @Patch('product/:id')
    async updateProduct(@Param('id') id: string, @Body() createProductDTO: CreateProductDTO) {
        return await this.productService.updateProduct(id, createProductDTO)
    }
}