import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DetallesApiService } from '../service/api/detalles-api.service';

@Component({
  selector: 'app-detalles-component',
  templateUrl: './detalles-component.component.html',
  styleUrls: ['./detalles-component.component.css']
})
export class DetallesComponentComponent implements OnInit {

  idComic: any = this.route.snapshot.params['id'];
  idSeries: any = this.route.snapshot.params['id'];
  idCreator: any = this.route.snapshot.params['id'];
  idCharacter: any = this.route.snapshot.params['id'];
  idEvent: any = this.route.snapshot.params['id'];
  idStories: any = this.route.snapshot.params['id'];

  public comics: Array<any> = [];
  accion: any = this.route.snapshot.queryParams['accion'];
  constructor(private comic: DetallesApiService, private routerVolver: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.idCharacter)
    switch (this.accion) {
      case "serie":
        this.comic.consultaSeriesMarvel(this.idSeries).subscribe((res) => {
          console.log('Respuesta', res);
          this.comics = res.data.results;
          console.log(this.comics);
        });
        break;
      case "creator":
        this.comic.consultaCreatorsMarvel(this.idCreator).subscribe((res) => {
          console.log('Respuesta', res);
          this.comics = res.data.results;
          console.log(this.comics);
        });
        break;
      case "comic":
        this.comic.consultaComicsMarvel(this.idComic).subscribe((res) => {
          console.log('Respuesta', res);
          this.comics = res.data.results;
          console.log(this.comics);
        });
        break;
      case "character":
        this.comic.consultaCharactersMarvel(this.idCharacter).subscribe((res) => {
          console.log(this.idCharacter);console.log('Respuesta', res);
          this.comics = res.data.results;
          console.log(this.comics);
        });
        break;
      case "events":
        this.idEvent = this.route.snapshot.params['id'];
        this.comic.consultaEventsMarvel(this.idEvent).subscribe((res) => {
          console.log('Respuesta', res);
          this.comics = res.data.results;
          console.log(this.comics);
        });
        break;
      case "stories":
        this.idStories = this.route.snapshot.params['id'];
        this.comic.consultaStoriesMarvel(this.idStories).subscribe((res) => {
          console.log('Respuesta', res);
          this.comics = res.data.results;
          console.log(this.comics);
        });
        break;
    }

  }

}
