import { Controller, Post, Body, HttpStatus, Req, Res, Get, HttpException } from '@nestjs/common'
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from 'src/dto/register.dto';
import { LoginDto } from 'src/dto/login.dto';
import { VerifyOtpDto } from 'src/dto/verify.dto';
import { Model } from 'mongoose';
import { UserDocument } from 'src/schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
        private readonly userService: UserService,
                @InjectModel('User') private readonly userModel: Model<UserDocument>){}

@Post('register')
async register(@Body() registerDto: RegisterDto, @Res() res: Response) {
    try {
        await this.authService.register(registerDto)
        res.status(HttpStatus.CREATED).send({ message: 'Registration successful' })
    } catch (error) {
        if (error instanceof HttpException && error.getStatus() === HttpStatus.CONFLICT) {
            res.status(HttpStatus.CONFLICT).send({ message: 'User already exists' });
        } else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Registration failed' });
        }
    }

}

@Post('login')
async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    try {
        await this.authService.login(loginDto)
        res.status(HttpStatus.OK).send({ message: 'Login successful' })
    } catch (error) {
        if (error instanceof HttpException && error.getStatus() === HttpStatus.NOT_FOUND) {
            res.status(HttpStatus.NOT_FOUND).send({ message: 'User does not exist' });
        } else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Login failed' });
        }
    }

}


@Get('verify-otp') 
async getOtp() {}


@Post('verify-otp')
async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto, @Res() res: Response, @Req() req: Request) {
    try {
        await this.authService.verifyOtp(verifyOtpDto);
        const user = await this.userModel.findOne({ phoneNumber: verifyOtpDto.phoneNumber})
        const token = await this.userService.generateAccessToken(user._id);
        res.header('Authorization', `Bearer ${token}`).status(HttpStatus.OK).send({ message: 'OTP verification successful' });
    } catch (error) {
        if (error instanceof HttpException && error.getStatus() === HttpStatus.BAD_REQUEST) {
            res.status(HttpStatus.NOT_FOUND).send({ message: 'Invalid OTP' });
        } else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'OTP verification failed' });
        }
    }
}
}

