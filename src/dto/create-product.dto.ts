import { IsBase64, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDTO {

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
    image: Buffer;
}