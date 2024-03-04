import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import { UserRoles } from 'src/constant/role.constant';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from 'src/dto/register.dto';


@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>,
                private readonly jwtService: JwtService,
                private readonly configService: ConfigService) {}

    async userExistence(phoneNumber: string): Promise<boolean> {
        const user = await this.userModel.findOne({ phoneNumber })
        return !!user
    }

    async setUserRole(phoneNumber: string): Promise<number> {
        const adminPhoneNumber = this.configService.get<string>('adminPhoneNumber')
        const role = phoneNumber === adminPhoneNumber ? UserRoles.Admin : UserRoles.User
        return role
    }

    async createUser(phoneNumber: string, registerDto: RegisterDto) {
        const role = await this.setUserRole(phoneNumber)
        const newUser = new this.userModel({ ...registerDto, role})
        return await newUser.save()
    }

    async generateAccessToken(userId: string): Promise<string> {
        const payload = { userId }
        const secretKey = this.configService.get<string>('secretKey')
        return this.jwtService.sign(payload, { expiresIn: '1d', secret: secretKey })
    }
}
