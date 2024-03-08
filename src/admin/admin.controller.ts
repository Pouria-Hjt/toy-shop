import { Controller, Get, Patch, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { CreateProductDTO } from 'src/dto/create-product.dto';
import { ProductService } from 'src/product/product.service';
import { OrderService } from 'src/order/order.service';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/constant/role.constant';
import { RolesGuard } from 'src/guard/role.guard';
import { AuthGuard } from 'src/guard/auth.guard';

@UseGuards(AuthGuard, RolesGuard) 
@Controller('admin') 
@Roles(Role.Admin)
export class AdminController {
    constructor(
        private readonly productService: ProductService,
        private readonly orderService: OrderService) {}
    

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
     
    
    @Get('orders')
    async getAllOrders() {
        return await this.orderService.getAllOrders()
    }

    @Get('order/:id')
    async getOrder(@Param('id') id: string) {
        return await this.orderService.getOrder(id)
    }
}