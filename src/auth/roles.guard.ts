import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.getAllAndOverride<string>('role', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRole) return true; // Se não houver papel requerido, permite acesso

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) return false; // Se não houver token, não permite acesso

    // Verifica e decodifica o token JWT
    let user;
    try {
      user = this.jwtService.verify(token); // Aqui você pode passar a chave secreta se necessário
    } catch (error) {
      throw new ForbiddenException('Invalid token'); // Token inválido
    }

    // Verifica se o papel do usuário está entre os papéis requeridos
    if (user.role !== requiredRole) {
      throw new ForbiddenException('You do not have permission to access this resource');
    }

    return true; // Permite acesso
  }
}
