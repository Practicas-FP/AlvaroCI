import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public consultaComicsMarvel(offset: any, limit: any) {

    let url =
    'http://gateway.marvel.com/v1/public/comics?ts=1000&apikey=d227faa05f90f594c1959e2f56afef55&hash=b83e662f3ade20d32b8e5e4e80eb439c'
    + '&offset=' + offset + '&limit=' + limit;

    /*fetch('http://gateway.marvel.com/v1/public/comics?ts=1000&apikey=d227faa05f90f594c1959e2f56afef55&hash=b83e662f3ade20d32b8e5e4e80eb439c'
    + '&title=' + 'Avengers' + '&offset=' + '0' + '&limit=' + '100')
    .then(response => response.json())
    .then(data => console.log(data));*/

    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      }),
      retry(5)
    );
  }

  public consultaSeriesMarvel(offset: any, limit: any) {

    let url =
    'http://gateway.marvel.com/v1/public/series?ts=1000&apikey=d227faa05f90f594c1959e2f56afef55&hash=b83e662f3ade20d32b8e5e4e80eb439c'
    + '&offset=' + offset + '&limit=' + limit;

    /*fetch('http://gateway.marvel.com/v1/public/comics?ts=1000&apikey=d227faa05f90f594c1959e2f56afef55&hash=b83e662f3ade20d32b8e5e4e80eb439c'
    + '&title=' + 'Avengers' + '&offset=' + '0' + '&limit=' + '100')
    .then(response => response.json())
    .then(data => console.log(data));*/

    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      }),
      retry(5)
    );
  }

  public consultaCharactersMarvel(offset: any, limit: any) {

    let url =
    'http://gateway.marvel.com/v1/public/characters?ts=1000&apikey=d227faa05f90f594c1959e2f56afef55&hash=b83e662f3ade20d32b8e5e4e80eb439c'
    + '&offset=' + offset + '&limit=' + limit;

    /*fetch('http://gateway.marvel.com/v1/public/characters?ts=1000&apikey=d227faa05f90f594c1959e2f56afef55&hash=b83e662f3ade20d32b8e5e4e80eb439c'
    + '&title=' + 'Avengers' + '&offset=' + '0' + '&limit=' + '100')
    .then(response => response.json())
    .then(data => console.log(data));*/

    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      }),
      retry(5)
    );
  }

  public consultaStoriesMarvel(offset: any, limit: any) {

    let url2 =
    'http://gateway.marvel.com/v1/public/stories?ts=1000&apikey=d227faa05f90f594c1959e2f56afef55&hash=b83e662f3ade20d32b8e5e4e80eb439c'
    + '&offset=' + offset + '&limit=' + limit;

    let url =
    'http://gateway.marvel.com/v1/public/stories?ts=1000&apikey=d227faa05f90f594c1959e2f56afef55&hash=b83e662f3ade20d32b8e5e4e80eb439c&limit=100&offset=0';
    /*fetch('http://gateway.marvel.com/v1/public/stories?ts=1000&apikey=d227faa05f90f594c1959e2f56afef55&hash=b83e662f3ade20d32b8e5e4e80eb439c'
    + '&title=' + 'Avengers' + '&offset=' + '0' + '&limit=' + '100')
    .then(response => response.json())
    .then(data => console.log(data));*/

    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      }),
      retry(5)
    );
  }

  public consultaEventsMarvel(offset: any, limit: any) {

    let url =
    'http://gateway.marvel.com/v1/public/events?ts=1000&apikey=d227faa05f90f594c1959e2f56afef55&hash=b83e662f3ade20d32b8e5e4e80eb439c'
    + '&offset=' + offset + '&limit=' + limit;

    /*fetch('http://gateway.marvel.com/v1/public/events?ts=1000&apikey=d227faa05f90f594c1959e2f56afef55&hash=b83e662f3ade20d32b8e5e4e80eb439c'
    + '&title=' + 'Avengers' + '&offset=' + '0' + '&limit=' + '100')
    .then(response => response.json())
    .then(data => console.log(data));*/

    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      }),
      retry(5)
    );
  }

  public consultaCreatorsMarvel(offset: any, limit: any) {

    let url =
    'http://gateway.marvel.com/v1/public/creators?ts=1000&apikey=d227faa05f90f594c1959e2f56afef55&hash=b83e662f3ade20d32b8e5e4e80eb439c'
    + '&offset=' + offset + '&limit=' + limit;

    /*fetch('http://gateway.marvel.com/v1/public/creators?ts=1000&apikey=d227faa05f90f594c1959e2f56afef55&hash=b83e662f3ade20d32b8e5e4e80eb439c'
    + '&title=' + 'Avengers' + '&offset=' + '0' + '&limit=' + '100')
    .then(response => response.json())
    .then(data => console.log(data));*/

    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      }),
      retry(5)
    );
  }

  public consultaByTitleMarvel(name: any) {
    let url =
      'http://gateway.marvel.com/v1/public/comics?titleStartsWith=' + name + '&ts=1000&apikey=d227faa05f90f594c1959e2f56afef55&hash=b83e662f3ade20d32b8e5e4e80eb439c'
      + '&offset=0';

    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      }),
      retry(5)
    );
  }
}
