import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class GuardService {
  constructor(private lService: LoginService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requireAuth = route.data['requireAuth'] !== false; // Usar corchetes para acceder a la propiedad
    if (!requireAuth) {
      return true; // Permitir acceso sin autenticación
    }
    const isAuthenticated = this.lService.verificar();
    if (!isAuthenticated) {
      this.router.navigate(['/']);
      return false;
    }

    const allowedRoles = route.data['roles'];
    if (allowedRoles) {
      const userRole = this.lService.showRole();
      if (!allowedRoles.includes(userRole)) {
        this.router.navigate(['/']);
        return false;
      }
    }
    return true;
  }
}
