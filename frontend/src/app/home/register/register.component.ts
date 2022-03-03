import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
// nos redirecciona
import { Router } from '@angular/router';
//es la barrita que nos ayuda con los mensajes
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

// las variables goblales en ts se crean dentro de la clase any: es una variable que acepta cuañquier tipo de variables -- lo primero que necesitamos es que el services se este ejecutando antes del componente -- las variables del constructor por estandar llevan _ guion al piso
// el constructor se encarga de ejecutarlo antes de que el componente inicie, todo lo que este ahi lo inicia, luego el ngOninit funciona luego de que el constructor ejecute el componente inicie
// furationInseconds es para el tiempo que va a aparecer eb el mensaje
// this hace referencia a las variables que estemos usando entonces la inicializemos {}las llaves vacias es que va a recibir datos
// registerUser(indica que es una funcion){indica lo que hace el metodo} son los metodos
//       this.openSnackBarError()lo que esto hace es sacar el mensaje con una barrita con lo que se le declara en el mensaje
// this.horizontaPosition esto es mi variable lo que yo le asigne
// suscribe
export class RegisterComponent implements OnInit {
  registerData: any;
  message: string = '';
  horizontaPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2000;

  constructor(
    private _userServices: UserService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.registerData = {};
  }
  registerUser() {
    if (
      !this.registerData.name ||
      !this.registerData.email ||
      !this.registerData.password
    ) {
      this.message = 'Incomplete data';
      this.openSnackBarError();
    } else {
      this._userServices.registerUser(this.registerData).subscribe({
        next: (v) => {
          localStorage.setItem('token', v.token);
          this._router.navigate(['/saveTask']);
          this.message = 'Succesfull user registration';
          this.openSnackBarSuccesfull();
        },
        error: (e) => {
          this.message = e.error.message;
          this.openSnackBarError();
        },
      });
    }
  }
  openSnackBarSuccesfull() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontaPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds,
      panelClass: ['styleSnackBarSuccesfull'],
    });
  }
  openSnackBarError() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontaPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds,
      panelClass: ['styleSnackBarError'],
    });
  }

  ngOnInit(): void {}
}
