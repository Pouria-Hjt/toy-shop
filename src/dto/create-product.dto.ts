import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDTO {
    @IsNotEmpty()
    @IsString()
    _id: string

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    image: any;
}