import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JsonWebTokenError, NotBeforeError, TokenExpiredError } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authorization token is missing');
    }

    const token = authHeader.split(' ')[1];
    try {

      const user = await this.userService.findUserByToken(token);

      if (!user) {
        throw new UnauthorizedException('Invalid token or user not found');
      }

      request.user = user
      return true;
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
          if (error instanceof TokenExpiredError) {
            throw new UnauthorizedException('Authorization token expired');
          } else if (error instanceof NotBeforeError) {
            throw new UnauthorizedException('Authorization token not yet valid');
          } else {
            throw new UnauthorizedException('Invalid token format');
          }
        } else if (error.message === 'Cannot read properties of null (reading \'userId\')') {
          throw new UnauthorizedException('Invalid token');
        } else {
          console.error('Error verifying JWT token:', error);
          throw new UnauthorizedException('Unauthorized');
        }
    }
  }
}

