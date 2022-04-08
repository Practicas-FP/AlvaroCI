import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getDatabase, ref, child, get } from "firebase/database";
import { DetallesApiService } from '../service/api/detalles-api.service';
import { FavoritosApiService } from '../service/api/favoritos-api.service';
import { LeidosApiService } from '../service/api/leidos-api.service';

@Component({
  selector: 'app-detalles-component',
  templateUrl: './detalles-component.component.html',
  styleUrls: ['./detalles-component.component.css']
})
export class DetallesComponentComponent implements OnInit {

  ID: any = this.route.snapshot.params['id'];
  accion: any = this.route.snapshot.queryParams['accion'];
  fav: boolean = false;
  read: boolean = false;
  public comics: Array<any> = [];

  constructor(private comic: DetallesApiService, private addFav: FavoritosApiService, private addRead: LeidosApiService ,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.comprobarFav();
    this.comprobarRead();
    switch (this.accion) {
      case "serie":
        this.comic.consultaSeriesMarvel(this.ID).subscribe((res) => {
          this.comics = res.data.results;
        });
        break;
      case "creator":
        this.comic.consultaCreatorsMarvel(this.ID).subscribe((res) => {
          console.log('Respuesta', res);
          this.comics = res.data.results;
          console.log(this.comics);
        });
        break;
      case "comic":
        this.comic.consultaComicsMarvel(this.ID).subscribe((res) => {
          this.comics = res.data.results;
        });
        break;
      case "character":
        this.comic.consultaCharactersMarvel(this.ID).subscribe((res) => {
          this.comics = res.data.results;
        });
        break;
      case "events":
        this.comic.consultaEventsMarvel(this.ID).subscribe((res) => {
          this.comics = res.data.results;
        });
        break;
      case "stories":
        this.comic.consultaStoriesMarvel(this.ID).subscribe((res) => {
          this.comics = res.data.results;
        });
        break;
    }
  }

  comprobarFav() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/favoritos/${this.accion}/${this.ID}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        this.fav = true;
      } else {
        console.log("No data available");
        this.fav = false;
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  comprobarRead() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/leido/${this.accion}/${this.ID}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        this.fav = true;
      } else {
        console.log("No data available");
        this.fav = false;
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  agregarFav(id: string, title: string, image: string, extension: string) {
    this.addFav.agregarFav(this.accion, id, title, image, extension);
    this.fav = true;
  }

  agregarFav2(id: string, title: string) {
    this.addFav.agregarFav2(this.accion, id, title);
    this.fav = true;
  }

  eliminarFav(id: string){
    this.addFav.quitarFav(this.accion, id);
    this.fav = false;
  }

  agregarRead(id: string, title: string, image: string, extension: string) {
    this.addRead.agregarRead(this.accion, id, title, image, extension);
    this.read = true;
  }

  agregarRead2(id: string, title: string) {
    this.addRead.agregarRead2(this.accion, id, title);
    this.read = true;
  }

  eliminarRead(id: string){
    this.addRead.quitarRead(this.accion, id);
    this.read = false;
  }
}
