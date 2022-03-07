import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

// cuando cargo la pagina  antes de mostrar lo de la pagina el constructor instancia todo antes de que la pagina cargue 
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(public _userService: UserService, private _router: Router) {}

  ngOnInit(): void {}

  logout() {
    this._userService.logout();
    this._router.navigate(['/login']);
  }
}
