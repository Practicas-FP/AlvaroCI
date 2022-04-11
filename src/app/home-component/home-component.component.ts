import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchServicioService } from './../service/search/search-servicio.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {

  accion: string = "vacio";
  title = 'Marvel-Comics';
  disabled: boolean = false;
  creator: boolean = false;
  public comics: Array<any> = [];
  public page: number = 0;


  constructor(private comic: SearchServicioService, private route: Router) { }

  ngOnInit(): void {
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
    if (this.accion === "Historias") {
      this.disabled = true;
      this.llamadaGeneral("a");
    } else if (this.accion === "Creadores") {
      this.creator = true;
    } else {
      this.disabled = false;
      this.creator = false;
    }
  }

  onKeyup(key2: string) {
    if (this.accion == "vacio") {
      alert("Selecciones filtro antes de buscar.");
    } else {
      this.llamadaGeneral(key2);
    }
  }

  btnSearch(key2: string) {
    if (this.accion == "vacio") {
      alert("Selecciones filtro antes de buscar.");
    } else {
      this.llamadaGeneral(key2);
    }
  }

  public llamadaGeneral(key: string) {
    this.comic.consultaMarvel(this.accion, key).subscribe((res) => {
      console.log('Respuesta', res);
      this.comics = res.data.results;
    });
  }

}
