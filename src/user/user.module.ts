import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from 'src/schema/order.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { OrderService } from 'src/order/order.service';
import { UserSchema } from 'src/schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthInterceptor } from 'src/auth/auth.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ProductSchema } from 'src/schema/product.schema';
import { ProductService } from 'src/product/product.service';

@Module({
    imports: [ MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema}]),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema}]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema}])],
    controllers: [ UserController ],
    providers: [ UserService, OrderService, JwtService, ConfigService, ProductService,        {
        provide: APP_INTERCEPTOR,
        useClass: AuthInterceptor,
    }]
})
export class UserModule {}
