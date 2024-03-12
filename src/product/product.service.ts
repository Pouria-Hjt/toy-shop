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
        const products = await this.productModel.find();
        const transformedProducts = await Promise.all(products.map(async (product) => ({
            ...product.toObject(),
            image: await this.encodeImage(product.image),
        })));
        return transformedProducts;
    }
    
    async getProduct(id: string): Promise<Product> {
        const product = await this.productModel.findById(id);
        if (!product) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }
        return {
            ...product.toObject(),
            image: await this.encodeImage(product.image), 
        };
    }

    async addProduct(createProductDTO: CreateProductDTO): Promise<Product> {
        const decodedImage = await this.decodeImage(createProductDTO.image);
        const newProduct = new this.productModel({ ...createProductDTO, image: decodedImage });
        return await newProduct.save();
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

    async  decodeImage(base64Image: Buffer): Promise<Buffer> {
        const binaryData = Buffer.from(base64Image.toString(), 'base64');
        return binaryData;
    }
    
    async  encodeImage(binaryImageData: Buffer): Promise<Buffer> {
        const encodedImage = Buffer.from(binaryImageData.toString('base64'), 'base64');
        return encodedImage;
    }
}