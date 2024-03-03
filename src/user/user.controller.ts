import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateOrderDTO } from 'src/dto/create-order.dto';
import { OrderService } from 'src/order/order.service';


@Controller('user')
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
    async addOrder(@Body() createOrderDTO: CreateOrderDTO) {
        return await this.orderService.addOrder(createOrderDTO)
    }
}