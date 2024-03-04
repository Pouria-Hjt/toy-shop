import { Injectable } from '@nestjs/common';
import * as kavenegar from 'kavenegar'
import Redis from 'ioredis';
import { VerifyOtpDto } from 'src/dto/verify.dto';


@Injectable()
export class OtpService {
    private readonly client: Redis;

    constructor() {
      this.client = new Redis(); // Redis connection
    }

    async generateAndStoreOtp(phoneNumber: string): Promise<string> {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await this.client.set(phoneNumber, otp, 'EX', 120);
        return otp
    }

    async sendOtp(phoneNumber: string): Promise<boolean> {
        const api = kavenegar.KavenegarApi({
            apikey: ''
        })
        const otp: string = await this.generateAndStoreOtp(phoneNumber)
        return new Promise((resolve, reject) => {
            api.VerifyLookup({
                receptor: phoneNumber,
                token: otp,
                template: '',
            }, function(response, status) {
                status === 200 ? resolve(true) : reject(false)
            })
        })
    }

    async verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<boolean> {
        const storedOtp = await this.client.get(verifyOtpDto.phoneNumber)
        return verifyOtpDto.otp === storedOtp
    }
}
