import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";


export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    phoneNumber: string;
}
