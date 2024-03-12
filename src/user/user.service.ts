import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/constant/role.constant';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from 'src/dto/register.dto';


@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>,
                private readonly jwtService: JwtService,
                private readonly configService: ConfigService) {}

    async userExistence(phoneNumber: string) {
        const user = await this.userModel.findOne({ phoneNumber: phoneNumber })
        return !!user
    }

    async setUserRole(phoneNumber: string): Promise<Role> {
        const adminPhoneNumber = this.configService.get<string>('adminPhoneNumber');
        const roles = phoneNumber === adminPhoneNumber ? Role.Admin : Role.User;
        return roles;
    }

    async createUser(phoneNumber: string, registerDto: RegisterDto) {
        const roles = await this.setUserRole(phoneNumber)
        const newUser = new this.userModel({ ...registerDto, roles})
        return await newUser.save()
    }

    async generateAccessToken(userId: string): Promise<string> {
        const payload = { userId }
        const secretKey = this.configService.get<string>('secretKey')
        return this.jwtService.sign(payload, { expiresIn: '1d', secret: secretKey })
    }

    async findUserByToken(token: string): Promise<User> {
        const decodedToken = this.jwtService.decode(token) as { userId: string };
        const user: User = await this.userModel.findById(decodedToken.userId).exec();
        return user;
    }
}
