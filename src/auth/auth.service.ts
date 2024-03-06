import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
        try {
            const userExists = await this.userService.userExistence(registerDto.phoneNumber)
            if (userExists) {
                throw new HttpException('User already exists', HttpStatus.CONFLICT)
            }
            await this.otpService.generateAndStoreOtp(registerDto.phoneNumber)
            // await this.otpService.sendOtp(registerDto.phoneNumber)
            await this.userService.createUser(registerDto.phoneNumber, registerDto);
        } catch (error) {
            throw new HttpException('Registration failed', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

        // verify
    async login(loginDto: LoginDto) {
        try {
            const userExists = await this.userService.userExistence(loginDto.phoneNumber)
            if (!userExists) {
                throw new HttpException('User does not exist', HttpStatus.NOT_FOUND)
            }
            await this.otpService.generateAndStoreOtp(loginDto.phoneNumber)

            // await this.otpService.sendOtp(loginDto.phoneNumber)
            // // verify
        } catch (error) {
            throw new HttpException('Login failed', HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }

    async verifyOtp(verifyOtpDto: VerifyOtpDto) {
        try {
            const isOtpValid = await this.otpService.verifyOtp(verifyOtpDto)
            if (!isOtpValid) {
                throw new HttpException('Invalid OTP', HttpStatus.BAD_REQUEST)
            } 
        } catch (error) {
            throw new HttpException('OTP verification failed', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    } 
}