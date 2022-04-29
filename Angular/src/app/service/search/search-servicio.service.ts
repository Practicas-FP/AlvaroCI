import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchServicioService {

  constructor(private http: HttpClient) { }

  public consultaMarvel(accion: string, title: any) {
    let accion2: string = "";
    switch (accion) {
      case "Series":
        accion = "series";
        accion2 = "titleStartsWith";
        break;
      case "Comics":
        accion = "comics";
        accion2 = "titleStartsWith";
        break;
      case "Personajes":
        accion = "characters";
        accion2 = "nameStartsWith";
        break;
      case "Eventos":
        accion = "events";
        accion2 = "nameStartsWith";
        break;
      case "Historias":
        accion = "stories";
        break;
      case "Creadores":
        accion = "creators";
        accion2 = "nameStartsWith";
        break;
    }

    let url = "";
    if (accion === "stories") {
      url =
        'http://gateway.marvel.com/v1/public/' + accion + '?orderBy=id&ts=1000&apikey=d227faa05f90f594c1959e2f56afef55&hash=b83e662f3ade20d32b8e5e4e80eb439c&offset=0&limit=100';
    } else {
      url =
        'http://gateway.marvel.com/v1/public/' + accion + '?' + accion2 + '=' + title + '&ts=1000&apikey=d227faa05f90f594c1959e2f56afef55&hash=b83e662f3ade20d32b8e5e4e80eb439c&offset=0&limit=100';
    }

    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      }),
      retry(5)
    );
  }
}
