import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

// con el this inicializamos la variable
// dentro del () de constructor se puede usar services, guar --- archivos grandes, del resto si solo son variables dejelas afuera-- como parametros vienen esos modulos grandes que trae cosas de otras partes-- los que vengan internos de angular- a
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private env: string;
  constructor(private _http: HttpClient) {
    this.env = environment.APP_URL;
  }

  // env es http://localhost3001/api/user/register
  registerUser(user: any) {
    return this._http.post<any>(this.env + 'user/register', user);
  }

  login(user: any) {
    return this._http.post<any>(this.env + 'user/login', user);
  }

  // lo que hace esta optimizacion sirve oara cuando se devuelve un true o un false lo que hace es una doble negacion -- mira si hay un token si lo hay devuelve true, si no devulve false
  loggedIn() {
    return !!localStorage.getItem('token');
  }

// guarda el token
  getToken() {
    return localStorage.getItem('token');
  }

  // elimina el token
  logout() {
    localStorage.removeItem('token');
  }
}
