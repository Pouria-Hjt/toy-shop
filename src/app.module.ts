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
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';
import { AppConfigModule } from 'config/config.module';
import configuration from 'config/configuration';
import { UserSchema } from './schema/user.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
          uri: configService.get<string>('mongodbUrl')
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({ isGlobal: true,
      load: [configuration] }),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema}]),
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema}]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema}]),
    UserModule, ProductModule, AdminModule, OrderModule, AppConfigModule
          ],
  controllers: [AppController, UserController, ProductController, AdminController],
  providers: [AppService, UserService, ProductService, AdminService, OrderService, ConfigService, JwtService ],
})
export class AppModule {}
