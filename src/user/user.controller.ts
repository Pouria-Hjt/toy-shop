import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { CreateOrderDTO } from 'src/dto/create-order.dto';
import { Role } from 'src/constant/role.constant';
import { OrderService } from 'src/order/order.service';
import { Roles } from 'src/decorator/role.decorator';
import { RolesGuard } from 'src/guard/role.guard';
import { AuthGuard } from 'src/guard/auth.guard';
import { Request } from 'express';

@UseGuards(AuthGuard, RolesGuard)
@Controller('user')
@Roles(Role.User)
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
    async create(@Body() createOrderDto: CreateOrderDTO, @Req() req: Request) {
        return this.orderService.createOrder(createOrderDto, req);
    }
}