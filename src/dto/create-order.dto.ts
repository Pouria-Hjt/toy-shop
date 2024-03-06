import {  IsNotEmpty, IsNumber, IsArray, ArrayMinSize, ValidateNested, IsString } from "class-validator"


export class ProductDto {
    id: string

    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}

export class CreateOrderDTO {
    @IsNotEmpty()
    @IsString()
    token: string

    products: ProductDto[]
}