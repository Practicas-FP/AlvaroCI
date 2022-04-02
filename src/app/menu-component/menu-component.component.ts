import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFirebaseService } from '../service/firebase/auth-firebase.service';

@Component({
  selector: 'app-menu-component',
  templateUrl: './menu-component.component.html',
  styleUrls: ['./menu-component.component.css'],
})
export class MenuComponentComponent implements OnInit {
  public logueado: boolean;
  public usuario: any;
  constructor(private service: AuthFirebaseService, private router: Router) {
    this.logueado = false;
  }

  ngOnInit(): void {
    this.usuarioLogueado();
  }

  usuarioLogueado() {
    this.service.getInfoUsuarioLoggeado().subscribe((res) => {
      if (res != null) {
        this.logueado = true;
        this.usuario = res;
      } else {
        this.logueado = false;
      }
    });
  }

  logOut(): void {
    this.service.logOut().then((res) => {
      this.logueado = false;
      this.router.navigate(['/']);
    });
  }
}
