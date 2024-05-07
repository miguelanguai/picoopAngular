import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // Permitir el acceso si el usuario está autenticado
    } else {
      this.router.navigate(['/login']); // Redirigir al usuario al componente de inicio de sesión si no está autenticado
      return false;
    }
  }
}
