import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { ProductService } from 'src/product/product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from 'src/schema/product.schema';
import { OrderSchema } from 'src/schema/order.schema';
import { OrderService } from 'src/order/order.service';
import { UserService } from 'src/user/user.service';
import { UserSchema } from 'src/schema/user.schema';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from 'src/guard/role.guard';
import { AuthGuard } from 'src/guard/auth.guard';

@Module({
    imports: [ MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema}]),
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema}]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema}]) ],
    controllers: [ AdminController],
    providers: [ AdminService, ProductService, OrderService, UserService , ConfigService, JwtService, RolesGuard, AuthGuard]
})
export class AdminModule {}
