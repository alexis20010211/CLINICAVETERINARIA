import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles: string[] = route.data['roles'];
    const role = this.authService.getRole();

    if (role && expectedRoles.includes(role)) {
      return true;
    } else {
      this.router.navigate(['/login']); // Redirige si no tiene permisos
      return false;
    }
  }
}
