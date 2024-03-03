import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from 'src/schema/order.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { OrderService } from 'src/order/order.service';

@Module({
    imports: [ MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema}])],
    controllers: [ UserController ],
    providers: [ UserService, OrderService]
})
export class UserModule {}
