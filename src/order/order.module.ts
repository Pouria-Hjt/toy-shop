import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderSchema } from 'src/schema/order.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [ MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema}]) ],
    controllers: [ OrderController ],
    providers: [ OrderService ]
})
export class OrderModule {}
