import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as kavenegar from 'kavenegar'
import Redis from 'ioredis';
import { VerifyOtpDto } from 'src/dto/verify.dto';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class OtpService {
    private readonly client: Redis;

    constructor(private readonly configService: ConfigService) {
      this.client = new Redis(); // Redis connection
    }

    async generateAndStoreOtp(phoneNumber: string): Promise<string> {
        try {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            await this.client.set(phoneNumber, otp, 'EX', 120);
            console.log(`otp: ${otp}`)
            return otp
        } catch (error) {
            throw new HttpException('Failed to generate and store OTP', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async sendOtp(phoneNumber: string): Promise<boolean> {
        try {
            const api = kavenegar.KavenegarApi({
                apikey:  this.configService.get<string>('apiKey')
            })
            const otp: string = await this.generateAndStoreOtp(phoneNumber)
            return new Promise((resolve, reject) => {
                api.VerifyLookup({
                    receptor: phoneNumber,
                    token: otp,
                    template: '',
                }, function(response, status) {
                    if (status === 200) {
                        resolve(true);
                    } else {
                        reject(false)
                    }
                })
            })
        } catch (error) {
            throw new HttpException('Failed to send OTP', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<boolean> {
        try {
            const storedOtp = await this.client.get(verifyOtpDto.phoneNumber)
            const isVerified = verifyOtpDto.otp === storedOtp
            if (isVerified) {
                return true
            } else {
                throw new HttpException('Invalid OTP', HttpStatus.BAD_REQUEST)
            }
        } catch (error) {
            throw new HttpException('Failed to verify OTP', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
