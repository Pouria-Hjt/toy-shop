import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from 'src/user/user.service';
import { User, UserSchema } from 'src/schema/user.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { OtpService } from 'src/otp/otp.service';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [ MongooseModule.forFeature([{ name: 'User', schema: UserSchema}])],
    controllers: [AuthController],
    providers: [ AuthService, UserService, OtpService, JwtService]
})
export class AuthModule {}
