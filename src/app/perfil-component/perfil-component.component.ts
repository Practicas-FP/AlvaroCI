import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFirebaseService } from '../service/firebase/auth-firebase.service';

@Component({
  selector: 'app-perfil-component',
  templateUrl: './perfil-component.component.html',
  styleUrls: ['./perfil-component.component.css'],
})
export class PerfilComponentComponent implements OnInit {
  public logueado: boolean;
  public usuario: any;
  public uid: string = "invitado";

  constructor(private service: AuthFirebaseService, private route: Router) {
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
        this.uid = res.uid;
      } else {
        this.logueado = false;
        this.uid = "invitado";
      }
      if (this.uid === "invitado") {
        this.route.navigate(['login']);
      } else {
        this.route.navigate(['perfil']);
      }
    });
  }
}
