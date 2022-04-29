import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFirebaseService } from '../service/firebase/auth-firebase.service';
import { getDatabase, ref, child, get } from "firebase/database";

@Component({
  selector: 'app-perfil-component',
  templateUrl: './perfil-component.component.html',
  styleUrls: ['./perfil-component.component.css'],
})
export class PerfilComponentComponent implements OnInit {
  public logueado: boolean;
  public usuario: any;
  public uid: string = "invitado";
  public accion: string[] = ["comic", "character", "creator", "events", "serie", "stories"];
  public countFav: number = 0;
  public countRead: number = 0;

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
        this.comprobarFav();
        this.comprobarRead();
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

  comprobarFav() {
    const dbRef = ref(getDatabase());
    this.accion.forEach((accion: string) => {
      get(child(dbRef, `users/${this.uid}/favoritos/${accion}`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          this.countFav += snapshot.size
        } else {
          console.log("No Fav");
        }
      }).catch((error) => {
        console.error(error);
      });
    });
  }

  comprobarRead() {
    const dbRef = ref(getDatabase());
    this.accion.forEach((accion: string) => {
      get(child(dbRef, `users/${this.uid}/leido/${accion}`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          this.countRead += snapshot.size
        } else {
          console.log("No read");
        }
      }).catch((error) => {
        console.error(error);
      });
    });
  }
}
