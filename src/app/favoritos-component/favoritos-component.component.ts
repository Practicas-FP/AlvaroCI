import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFirebaseService } from '../service/firebase/auth-firebase.service';
import { getDatabase, ref, child, get } from "firebase/database";
import { ApiService } from '../service/api/api.service';

@Component({
  selector: 'app-favoritos-component',
  templateUrl: './favoritos-component.component.html',
  styleUrls: ['./favoritos-component.component.css']
})
export class FavoritosComponentComponent implements OnInit {
  public logueado: boolean;
  public stories: boolean = false;
  public creators: boolean = false;
  public usuario: any;
  public uid: string = "invitado";
  public items: Array<any> = [];
  public accion: string = "vacio";
  public page: number = 0;
  public idComic: Array<any> = [];
  public idCharacter: Array<any> = [];
  public idSerie: Array<any> = [];
  public idStorie: Array<any> = [];
  public idEvents: Array<any> = [];
  public idCreators: Array<any> = [];

  constructor(private service: AuthFirebaseService, private route: Router, private consulta: ApiService) {
    this.logueado = false;
  }

  ngOnInit(): void {
    this.usuarioLogueado();
  }

  filtro(event: Event) {
    this.accion = (<HTMLInputElement>event.target).value;
    if (this.accion === "stories") {
      this.stories = true;
      this.creators = false;
    } else if (this.accion === "creators") {
      this.stories = false;
      this.creators = true;
    } else {
      this.creators = false;
      this.stories = false;
    }
    this.comprobarFav();
  }

  comprobarFav() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${this.uid}/favoritos/${this.accion}`)).then((snapshot) => {
      if (snapshot.exists()) {
        var array: Array<any> = [];
        switch (this.accion) {
          case "comic":
            const data = snapshot.val();
            console.log('prueba 0: ',data);
            array.push(data);
            console.log('prueba 1: ',array);
            this.idComic.push(array[0]);

            this.consulta.consultaComicsMarvel("0","100").subscribe((res) => {
              console.log('Respuestas:  ', res.data.results);
              this.items = res.data.results;
              console.log(this.items);
              console.log(this.idComic);
            });
            break;
          case "series":
            break;
            case "series":
            break;
            case "series":
            break;
            case "series":
            break;
            case "series":
            break;

        }
      } else {
        console.log("No Fav");
      }
    }).catch((error) => {
      console.error(error);
    });
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
      }
    });
  }
}
