import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { UserService } from './user.service';
// este import lo que hace es traer ese HttpInterceptor

// la clase tokenIncerpetorServices va a implementar lo de HttpInterceptor
// vamos a coger el token lo vamos a  interceptar
// handle: hacer esto, encargarse de algo
@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private _userService: UserService) {}
  intercept(req: any, next: any) {
    const tokenReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + this._userService.getToken(),
      },
    });
    return next.handle(tokenReq);
  }
}
