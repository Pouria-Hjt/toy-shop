import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from 'src/user/user.service';
import { UserSchema } from 'src/schema/user.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { OtpService } from 'src/otp/otp.service';
import { JwtService } from '@nestjs/jwt';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthInterceptor } from './auth.interceptor';

@Module({
    imports: [ MongooseModule.forFeature([{ name: 'User', schema: UserSchema}])],
    controllers: [AuthController],
    providers: [ AuthService, UserService, OtpService, JwtService,
        {
            provide: APP_INTERCEPTOR,
            useClass: AuthInterceptor,
        }]
})
export class AuthModule {}
