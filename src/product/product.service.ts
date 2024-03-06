import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Product, ProductDocument } from 'src/schema/product.schema';
import { Model } from 'mongoose';
import { CreateProductDTO } from 'src/dto/create-product.dto';
import { InjectModel } from '@nestjs/mongoose';

export type ProductModel = Model<ProductDocument>

@Injectable()
export class ProductService {
    
    constructor(@InjectModel('Product') private readonly productModel: Model<ProductDocument>) {}

    async getAllProducts(): Promise<Product[]> {
        return await this.productModel.find()
    }

    async getProduct(id: string): Promise<Product> {
        return await this.productModel.findById(id)
    }

    async addProduct(createProductDTO: CreateProductDTO): Promise<Product> {
        const newProduct = await this.productModel.create(createProductDTO)
        return newProduct.save()
    }

    async deleteProduct(id: string): Promise<Product> {
        try {
            return await this.productModel.findByIdAndDelete(id)
        }
        catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateProduct(id: string, createProductDTO: CreateProductDTO): Promise<Product> {
        try {
            return await this.productModel.findByIdAndUpdate(id, createProductDTO)
        }
        catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}