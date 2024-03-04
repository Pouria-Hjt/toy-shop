import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private readonly userService: UserService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const request = context.switchToHttp().getRequest();

    const authToken = `Bearer ${this.userService.generateAccessToken(request.userId)}`;
    
    request.headers['Authorization'] = authToken;

    return next.handle();
  }
}
