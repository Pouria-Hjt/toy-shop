import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderSchema } from 'src/schema/order.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from 'src/schema/product.schema';
import { UserSchema } from 'src/schema/user.schema';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [ MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema}]),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema}]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema}]), ],
    controllers: [ OrderController ],
    providers: [ OrderService, UserService, ProductService, JwtService ]
})
export class OrderModule {}
