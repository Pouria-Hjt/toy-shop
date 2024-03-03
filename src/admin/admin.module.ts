import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { ProductService } from 'src/product/product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from 'src/schema/product.schema';
import { OrderSchema } from 'src/schema/order.schema';
import { OrderService } from 'src/order/order.service';

@Module({
    imports: [ MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema}]),
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema}]) ],
    controllers: [ AdminController],
    providers: [ AdminService, ProductService, OrderService]
})
export class AdminModule {}
