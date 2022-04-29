import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public consultaComicsMarvel(offset: any, limit: any) {

    const url =
      'http://gateway.marvel.com/v1/public/comics?ts=1000&apikey=d227faa05f90f594c1959e2f56afef55&hash=b83e662f3ade20d32b8e5e4e80eb439c'
      + '&offset=' + offset + '&limit=' + limit;

    return this.http.get(url).pipe(
      map((res: any) => res),
      retry(5)
    );
  }

  public consultaSeriesMarvel(offset: any, limit: any) {

    const url =
      'http://gateway.marvel.com/v1/public/series?ts=1000&apikey=d227faa05f90f594c1959e2f56afef55&hash=b83e662f3ade20d32b8e5e4e80eb439c'
      + '&offset=' + offset + '&limit=' + limit;

    return this.http.get(url).pipe(
      map((res: any) => res),
      retry(5)
    );
  }

  public consultaCharactersMarvel(offset: any, limit: any) {

    const url =
      'http://gateway.marvel.com/v1/public/characters?ts=1000&apikey=d227faa05f90f594c1959e2f56afef55&hash=b83e662f3ade20d32b8e5e4e80eb439c'
      + '&offset=' + offset + '&limit=' + limit;

    return this.http.get(url).pipe(
      map((res: any) => res),
      retry(5)
    );
  }

  public consultaStoriesMarvel(offset1: any, limit1: any) {

    const base = 'http://gateway.marvel.com/v1/public/stories?limit=100&offset=0';
    const ts = 'ts=1000&';
    const apiKey = 'apikey=d227faa05f90f594c1959e2f56afef55&hash=b83e662f3ade20d32b8e5e4e80eb439c&';
    const offset = 'offset='+offset1+'&';
    const limit = 'limit='+limit1;

    const url = base+ts+apiKey+offset+limit;
    return this.http.get(url).pipe(
      map((res: any) => res),
      retry(5)
    );
  }

  public consultaEventsMarvel(offset: any, limit: any) {

    const url =
      'http://gateway.marvel.com/v1/public/events?ts=1000&apikey=d227faa05f90f594c1959e2f56afef55&hash=b83e662f3ade20d32b8e5e4e80eb439c'
      + '&offset=' + offset + '&limit=' + limit;

    return this.http.get(url).pipe(
      map((res: any) => res),
      retry(5)
    );
  }

  public consultaCreatorsMarvel(offset: any, limit: any) {

    const url =
      'http://gateway.marvel.com/v1/public/creators?ts=1000&apikey=d227faa05f90f594c1959e2f56afef55&hash=b83e662f3ade20d32b8e5e4e80eb439c'
      + '&offset=' + offset + '&limit=' + limit;

    return this.http.get(url).pipe(
      map((res: any) => res),
      retry(5)
    );
  }

  public consultaDetailsMarvel(action: string, id: string){
    const url =
      'http://gateway.marvel.com/v1/public/'+action+'?id=' + id
      + '&ts=1000&apikey=d227faa05f90f594c1959e2f56afef55&hash=b83e662f3ade20d32b8e5e4e80eb439c'
      + '&limit=1' ;

    return this.http.get(url).pipe(
      map((res: any) => res),
      retry(5)
    );
  }
}
