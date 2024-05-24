import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    if (!this.authService.isAuthenticated()) {
      return false;
    }
    const role = await this.authService.getRole();
    if (role !== 'ADMIN') {
      this.router.navigate(['**']);
      return false;
    }
    return true;
  }
}
