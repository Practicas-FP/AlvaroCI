import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiSearchService {

  constructor(private http: HttpClient) { }

  public consultaMarvel(accion: string, title: any) {
    let accion2 = '';
    switch (accion) {
      case 'Series':
        accion = 'series';
        accion2 = 'titleStartsWith';
        break;
      case 'Comics':
        accion = 'comics';
        accion2 = 'titleStartsWith';
        break;
      case 'Characters':
        accion = 'characters';
        accion2 = 'nameStartsWith';
        break;
      case 'Events':
        accion = 'events';
        accion2 = 'nameStartsWith';
        break;
      case 'Stories':
        accion = 'stories';
        break;
      case 'Creators':
        accion = 'creators';
        accion2 = 'nameStartsWith';
        break;
    }

    let url = '';
    if (accion === 'stories') {
      url =
        'http://gateway.marvel.com/v1/public/' + accion +
        '?orderBy=id&ts=1000&apikey=d227faa05f90f594c1959e2f56afef55&hash=b83e662f3ade20d32b8e5e4e80eb439c&offset=0&limit=100';
    } else {
      url =
        'http://gateway.marvel.com/v1/public/' + accion + '?' + accion2 + '=' + title
        + '&ts=1000&apikey=d227faa05f90f594c1959e2f56afef55&hash=b83e662f3ade20d32b8e5e4e80eb439c&offset=0&limit=100';
    }

    return this.http.get(url).pipe(
      map((res: any) => res),
      retry(5)
    );
  }
}
