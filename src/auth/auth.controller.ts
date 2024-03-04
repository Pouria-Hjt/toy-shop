import { Controller, Post, Body, HttpException, HttpStatus, Redirect, Req, Res, Session } from '@nestjs/common'
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from 'src/dto/register.dto';
import { LoginDto } from 'src/dto/login.dto';
import { VerifyOtpDto } from 'src/dto/verify.dto';
import { Model } from 'mongoose';
import { UserDocument } from 'src/schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from 'src/user/user.service';
import { CustomSessionData } from 'src/interface/session.interface';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
        private readonly userService: UserService,
        @InjectModel('User') private readonly userModel: Model<UserDocument>){} 

@Post('register')
async register(
    @Body() registerDto: RegisterDto, 
    @Req() req: Request, 
    @Res() res: Response, 
    @Session() session: CustomSessionData
    ) {
        try {
            await this.authService.register(registerDto)
            const user = await this.userModel.findOne({ phoneNumber: registerDto.phoneNumber })
            session.userId = user._id
            res.redirect('verify-otp')
            await this.userService.createUser(registerDto.phoneNumber, registerDto)
        } catch (error) {
            res.status(500).send('Registration failed')
        }
}

@Post('login')
async login(
    @Body() loginDto: LoginDto, 
    @Res() res: Response, 
    @Req() req: Request,
    @Session() session: CustomSessionData
    ) {
        try {
            await this.authService.login(loginDto)
            const user = await this.userModel.findOne({ phoneNumber: loginDto.phoneNumber })
    
            session.userId = user._id
            res.redirect('verify-otp')
            // const phoneNumber = loginDto.phoneNumber
            // const user = this.userModel.findOne({ phoneNumber })
            // const userId = (await user)._id
            await this.userService.generateAccessToken(user._id)
        } catch (error) {
            res.status(500).send('Login failed')
        }
}

@Post('verify-otp') 
@Redirect('/')
async verifyOtp(
    @Body() verifyOtpDto: VerifyOtpDto, 
    @Res() res: Response, 
    @Req() req: Request,
    @Session() session: CustomSessionData
    ) {
        try {
            const { source } = session
            await this.authService.verifyOtp(verifyOtpDto);
    
            if (source === 'register') {
                res.redirect('/register');
            } else if (source === 'login') {
                res.redirect('/login');
            } else {
                res.status(400).send('Invalid request');
            }
        } catch (error) {
            res.status(500).send('OTP verification failed')
        }
    }
}
