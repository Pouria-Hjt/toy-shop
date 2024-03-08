import {  IsNotEmpty, IsNumber } from "class-validator"


export class ProductDto {
    id: string

    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}

export class CreateOrderDTO {

    products: ProductDto[]
}