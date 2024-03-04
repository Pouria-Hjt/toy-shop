import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class VerifyOtpDto {
    @IsNotEmpty()
    @IsPhoneNumber()
    phoneNumber: string

    @IsNotEmpty()
    @IsString()
    otp: string;
}