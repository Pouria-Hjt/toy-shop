import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "src/schema/user.schema";
import { OtpService } from "./otp.service";

@Module({
    imports: [ MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
    providers: [ ConfigService, OtpService]
})

export class OtpModule {}