import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from 'src/dto/register.dto';
import { LoginDto } from 'src/dto/login.dto';
import { OtpService } from 'src/otp/otp.service';
import { Model } from 'mongoose';
import { UserDocument } from 'src/schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { VerifyOtpDto } from 'src/dto/verify.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService,
                private readonly otpService: OtpService,
                @InjectModel('User') private readonly userModel: Model<UserDocument>) {}

    async register(registerDto: RegisterDto) {
        const userExists = this.userService.userExistence(registerDto.phoneNumber)
        if (userExists) {
            throw new Error('User already exists')
        }
        // new this.userModel({ ...registerDto})
        await this.otpService.sendOtp(registerDto.phoneNumber)
        // verify
    }

    async login(loginDto: LoginDto) {
        const userExists = this.userService.userExistence(loginDto.phoneNumber)
        if (!userExists) {
            throw new Error('User does not exist')
        }
        await this.otpService.sendOtp(loginDto.phoneNumber)
        // verify

    }

    async verifyOtp(verifyOtpDto: VerifyOtpDto) {
        const isOtpValid = await this.otpService.verifyOtp(verifyOtpDto)
        if (!isOtpValid) {
            throw new Error('Invalid OTP')
        } 
    }
}