import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from 'src/interface/order.interface';
import { OrderDocument } from 'src/schema/order.schema';
import { CreateOrderDTO } from 'src/dto/create-order.dto';

@Injectable()
export class OrderService {
    constructor(@InjectModel('Order') private readonly orderModel: Model<OrderDocument>) {}

    async getAllOrders(): Promise<Order[]> {
        return await this.orderModel.find()
    }

    async addOrder(createOrderDto: CreateOrderDTO): Promise<Order> {
        const newOrder = new this.orderModel(createOrderDto)
        return await newOrder.save()
    }

    async getOrder(id: string): Promise<Order> {
        try {
            return await this.orderModel.findById(id)
        }
        catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}