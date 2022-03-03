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
}
