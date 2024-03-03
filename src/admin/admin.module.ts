import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { ProductService } from 'src/product/product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from 'src/schema/product.schema';

@Module({
    imports: [ MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema}])],
    controllers: [ AdminController],
    providers: [ AdminService, ProductService]
})
export class AdminModule {}
