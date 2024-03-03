import {  IsNotEmpty, IsNumber, IsArray, ArrayMinSize, ValidateNested } from "class-validator"
import { Type } from "class-transformer"

export class ProductDto {
    @IsNotEmpty()
    id: string;

    name: string;
    price: number;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}

export class CreateOrderDTO {
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => ProductDto)
    products: ProductDto[]

    totalPrice: number
}