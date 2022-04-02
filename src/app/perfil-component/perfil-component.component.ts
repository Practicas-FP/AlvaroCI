import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from '../service/firebase/auth-firebase.service';

@Component({
  selector: 'app-perfil-component',
  templateUrl: './perfil-component.component.html',
  styleUrls: ['./perfil-component.component.css'],
})
export class PerfilComponentComponent implements OnInit {
  public logueado: boolean;
  public usuario: any;
  constructor(private service: AuthFirebaseService) {
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
}
