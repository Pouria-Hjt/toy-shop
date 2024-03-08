import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { Model} from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from 'src/schema/order.schema';
import { CreateOrderDTO, ProductDto } from 'src/dto/create-order.dto';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';
import { Request } from 'express';

@Injectable()
export class OrderService {
    constructor(@InjectModel('Order') private readonly orderModel: Model<OrderDocument>,
    private readonly userService: UserService,
    private readonly productService: ProductService) {}

    async getAllOrders(): Promise<Order[]> {
        return await this.orderModel.find()
    }

    async createOrder(createOrderDto: CreateOrderDTO, request: Request): Promise<Order> {
        const products: ProductDto[] = createOrderDto.products;
        const authHeader = request.headers.authorization;
    
        // Check if authorization header is present
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          throw new UnauthorizedException('Authorization token is missing');
        }
    
        const token = authHeader.split(' ')[1];
        const user = await this.userService.findUserByToken(token);
    
        if (!user) {
          throw new UnauthorizedException('Invalid token or user not found');
        }
    
        const username = user.username;
    
        const orderProducts = [];
        let totalPrice = 0;
    
        for (const productDto of products) {
          const storedProduct = await this.productService.getProduct(productDto.id);
    
          if (!storedProduct) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
          }
    
          const newProduct = {
            name: storedProduct.name,
            price: storedProduct.price,
            quantity: productDto.quantity
          };
    
          orderProducts.push(newProduct);
          totalPrice += newProduct.price * newProduct.quantity;
        }
    
        const newOrder = new this.orderModel({
          username: username,
          products: orderProducts,
          totalPrice: totalPrice
        });
    
        return await newOrder.save();
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