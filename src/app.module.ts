import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';
import { AdminService } from './admin/admin.service';
import { AdminController } from './admin/admin.controller';
import { AdminModule } from './admin/admin.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schema/product.schema';
import { OrderService } from './order/order.service';
import { OrderModule } from './order/order.module';
import { OrderSchema } from './schema/order.schema';

@Module({
  imports: [ MongooseModule.forRoot('mongodb://localhost/nest/Shop'),
  MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema}]),
  MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema}]),
    UserModule, ProductModule, AdminModule, OrderModule],
  controllers: [AppController, UserController, ProductController, AdminController],
  providers: [AppService, UserService, ProductService, AdminService, OrderService ],
})
export class AppModule {}
