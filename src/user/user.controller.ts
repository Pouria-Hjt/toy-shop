import { Controller, Get, Post, Body, Param, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { CreateOrderDTO } from 'src/dto/create-order.dto';
import { UserRoles } from 'src/constant/role.constant';
import { OrderService } from 'src/order/order.service';
import { Roles } from 'src/decorator/role.decorator';
import { AuthInterceptor } from 'src/auth/auth.interceptor';
import { ObjectId } from 'mongoose';

@Controller('user')
@Roles(UserRoles.User)
@UseInterceptors(AuthInterceptor)
export class UserController {
    constructor(private readonly orderService: OrderService) {}

    @Get('orders')
    async getAllOrders() {
        return await this.orderService.getAllOrders()
    }

    @Get('order/:id')
    async getOrder(@Param('id') id: string) {
        return await this.orderService.getOrder(id)
    }

    @Post('order/')
    async create(@Body() createOrderDto: CreateOrderDTO) {
        return this.orderService.createOrder(createOrderDto);
    }
}