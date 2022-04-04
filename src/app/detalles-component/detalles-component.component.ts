import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DetallesApiService } from '../service/api/detalles-api.service';

@Component({
  selector: 'app-detalles-component',
  templateUrl: './detalles-component.component.html',
  styleUrls: ['./detalles-component.component.css']
})
export class DetallesComponentComponent implements OnInit {

  idComic: any;
  fechaSalida: any;
  public comics: Array<any> = [];

  constructor(private comic: DetallesApiService,private routerVolver:Router,private route:ActivatedRoute) {}

  ngOnInit(): void {
    /*this.idComic = this.route.snapshot.params['id'];*/
    this.idComic = 25856;
    this.comic.consultaComicsMarvel(this.idComic).subscribe((res) => {
      console.log('Respuesta', res);
      this.comics = res.data.results;
    });
  }

}
