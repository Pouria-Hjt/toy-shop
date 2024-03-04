import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { UserRoles, UserRole } from 'src/constant/role.constant';

export type UserDocument = User & Document

@Schema()
export class User {
    @Prop()
    _id: string

    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    address: string;

    @Prop({ required: true, unique: true })
    phoneNumber: string;

    @Prop({ default: UserRoles.User })
    role: UserRole
}

export const UserSchema = SchemaFactory.createForClass(User)