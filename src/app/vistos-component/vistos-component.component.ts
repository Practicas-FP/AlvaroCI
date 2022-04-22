import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFirebaseService } from '../service/firebase/auth-firebase.service';
import { getDatabase, ref, child, get } from "firebase/database";
import { DetallesApiService } from '../service/api/detalles-api.service';

@Component({
  selector: 'app-vistos-component',
  templateUrl: './vistos-component.component.html',
  styleUrls: ['./vistos-component.component.css']
})
export class VistosComponentComponent implements OnInit {

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

  constructor(private service: AuthFirebaseService, private route: Router, private consulta: DetallesApiService) {
    this.logueado = false;
  }

  ngOnInit(): void {
    this.usuarioLogueado();
  }

  detallesSearch(id: string) {
    let newAccion;
    switch (this.accion) {
      case "Series":
        newAccion = "serie";
        break;
      case "Comics":
        newAccion = "comic";
        break;
      case "Personajes":
        newAccion = "character";
        break;
      case "Eventos":
        newAccion = "events";
        break;
      case "Historias":
        newAccion = "stories";
        break;
      case "Creadores":
        newAccion = "creator";
        break;
    }
    this.route.navigate(['detalles/', id], { queryParams: { accion: newAccion } });
  }

  filtro(event: Event) {
    this.accion = (<HTMLInputElement>event.target).value;
    if (this.accion === "stories") {
      this.stories = true;
      this.creators = false;
    } else {
      this.creators = false;
      this.stories = false;
    }
    this.comprobarFav();
  }

  comprobarFav() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${this.uid}/leido/${this.accion}`)).then((snapshot) => {
      if (snapshot.exists()) {
        var array: Array<any> = [];
        switch (this.accion) {
          case "comic":
            for(let i = this.items.length; i > 0; i--){
              this.items.pop();
            }
            var data = snapshot.val();
            array.push(data);
            this.idComic.push(array[0]);

            for (const [key] of Object.entries(array[0])) {
              this.consulta.consultaComicsMarvel(`${key}`).subscribe((res) => {
                this.items.push(res.data.results[0]) ;
              });
            }
            break;
          case "serie":
            for(let i = this.items.length; i > 0; i--){
              this.items.pop();
            }
            var data = snapshot.val();
            array.push(data);
            this.idComic.push(array[0]);

            for (const [key] of Object.entries(array[0])) {
              this.consulta.consultaSeriesMarvel(`${key}`).subscribe((res) => {
                this.items.push(res.data.results[0]) ;
              });
            }
            break;
          case "stories":
            for(let i = this.items.length; i > 0; i--){
              this.items.pop();
            }
            var data = snapshot.val();
            array.push(data);
            this.idComic.push(array[0]);

            for (const [key] of Object.entries(array[0])) {
              this.consulta.consultaStoriesMarvel(`${key}`).subscribe((res) => {
                this.items.push(res.data.results[0]) ;
              });
            }
            break;
          case "events":
            for(let i = this.items.length; i > 0; i--){
              this.items.pop();
            }
            var data = snapshot.val();
            array.push(data);
            this.idComic.push(array[0]);

            for (const [key] of Object.entries(array[0])) {
              this.consulta.consultaEventsMarvel(`${key}`).subscribe((res) => {
                this.items.push(res.data.results[0]) ;
              });
            }
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
