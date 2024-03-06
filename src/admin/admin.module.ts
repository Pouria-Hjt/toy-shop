import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { ProductService } from 'src/product/product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from 'src/schema/product.schema';
import { OrderSchema } from 'src/schema/order.schema';
import { OrderService } from 'src/order/order.service';
import { AuthInterceptor } from 'src/auth/auth.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserService } from 'src/user/user.service';
import { UserSchema } from 'src/schema/user.schema';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [ MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema}]),
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema}]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema}]) ],
    controllers: [ AdminController],
    providers: [ AdminService, ProductService, OrderService, UserService , ConfigService, JwtService, {
        provide: APP_INTERCEPTOR,
        useClass: AuthInterceptor,
    }]
})
export class AdminModule {}
