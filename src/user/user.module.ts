import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from 'src/schema/order.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { OrderService } from 'src/order/order.service';
import { UserSchema } from 'src/schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [ MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema}]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema}])],
    controllers: [ UserController ],
    providers: [ UserService, OrderService, JwtService, ConfigService]
})
export class UserModule {}
