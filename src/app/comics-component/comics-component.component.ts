import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../service/api/api.service';
import { SearchServicioService } from '../service/search/search-servicio.service';

@Component({
  selector: 'app-comics-component',
  templateUrl: './comics-component.component.html',
  styleUrls: ['./comics-component.component.css']
})

export class ComicsComponentComponent implements OnInit {

  title = 'Marvel-Comics';
  public comics: Array<any> = [];
  public offset: any = '0';
  public limit: any = '100';
  public page: number = 0;

  constructor(private comic: ApiService, private comicQuery: SearchServicioService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.llamadaGeneralComics();
  }

  public llamadaGeneralComics() {
    this.comic.consultaComicsMarvel(this.offset, this.limit).subscribe((res) => {
      console.log('Respuesta', res);
      this.comics = res.data.results;
    });
  }
}
