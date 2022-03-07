import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';

// canActive nos permite activar o proteger unas rutas -- el mira si esa funcion que esta en services nos devuelve algo si hay un token el nos devuelve un true y si no hay pun token el devuelve  un false
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _userServices: UserService, private _router: Router) {}
  
  canActivate(): boolean {
    if (!this._userServices.loggedIn()) {
      this._router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}
