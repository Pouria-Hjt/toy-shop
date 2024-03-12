import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorator/role.decorator';
import { Role } from 'src/constant/role.constant';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // No roles required, access granted
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(user)
    // if (!user || !user.roles) {
    //   throw new ForbiddenException('Invalid user roles');
    // }

    const userRoles: Role[] = Array.isArray(user.roles) ? user.roles : [user.roles];

    const hasRole = () => userRoles.some(role => requiredRoles.includes(role));
    if (!hasRole()) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return true;
  }
}



// @Injectable()
// export class RolesGuard implements CanActivate {
//     constructor(private readonly reflector: Reflector) {}

//     canActivate(context: ExecutionContext): boolean {
//         const requiredRoles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
//         console.log(requiredRoles)
//         if (!requiredRoles) {
//             return true; // Allow access if no roles are specified
//         }

//         const user: User = context.switchToHttp().getRequest().user;
//         return requiredRoles.some((role) => user.roles === role);
//     }
// }