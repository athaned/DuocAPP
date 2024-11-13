import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const ingresado = localStorage.getItem('ingresado');

    // Verifica si el usuario tiene permiso
    if (ingresado === 'true') {
      return true;
    } else {
      // Si no está permitido, redirige a la página de inicio
      this.router.navigate(['/home']);
      return false;
    }
  }
}
