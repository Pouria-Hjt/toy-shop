import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from 'src/dto/register.dto';
import { LoginDto } from 'src/dto/login.dto';
import { OtpService } from 'src/otp/otp.service';
import { VerifyOtpDto } from 'src/dto/verify.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService,
                private readonly otpService: OtpService) {}

    async register(registerDto: RegisterDto) {
            const userExists = await this.userService.userExistence(registerDto.phoneNumber)
            if (userExists === true) {
                throw new HttpException('User already exists', HttpStatus.CONFLICT)
            }
            await this.otpService.generateAndStoreOtp(registerDto.phoneNumber)
            // await this.otpService.sendOtp(registerDto.phoneNumber)
            await this.userService.createUser(registerDto.phoneNumber, registerDto);
    }

    async login(loginDto: LoginDto) {
            const userExists = await this.userService.userExistence(loginDto.phoneNumber)
            if (userExists === false) {
                throw new HttpException('User does not exist', HttpStatus.NOT_FOUND)
            }
            await this.otpService.generateAndStoreOtp(loginDto.phoneNumber)
            // await this.otpService.sendOtp(loginDto.phoneNumber)

    }

    async verifyOtp(verifyOtpDto: VerifyOtpDto) {
            const isOtpValid = await this.otpService.verifyOtp(verifyOtpDto)
            if (!isOtpValid) {
                throw new HttpException('Invalid OTP', HttpStatus.BAD_REQUEST)
            }
    } 
}