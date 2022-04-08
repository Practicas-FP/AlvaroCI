import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetallesApiService {

  constructor(private http: HttpClient) { }

  /*************BUSQUEDA POR ID********************/
  public consultaComicsMarvel(id: any) {

    let url =
      'http://gateway.marvel.com/v1/public/comics?id=' + id + '&ts=1000&apikey=d227faa05f90f594c1959e2f56afef55&hash=b83e662f3ade20d32b8e5e4e80eb439c'
      + '&offset=' + '0' + '&limit=' + '1';

    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      }),
      retry(5)
    );
  }

  public consultaSeriesMarvel(id: any) {

    let url =
      'http://gateway.marvel.com/v1/public/series?id=' + id + 'ts=1000&apikey=d227faa05f90f594c1959e2f56afef55&hash=b83e662f3ade20d32b8e5e4e80eb439c'
      + '&offset=0&limit=1';

    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      }),
      retry(5)
    );
  }

  public consultaCharactersMarvel(id: any) {

    let url =
      'http://gateway.marvel.com/v1/public/characters?id=' + id + 'ts=1000&apikey=d227faa05f90f594c1959e2f56afef55&hash=b83e662f3ade20d32b8e5e4e80eb439c'
      + '&offset=0&limit=1';

    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      }),
      retry(5)
    );
  }

  public consultaStoriesMarvel(id: any) {

    let url =
      'http://gateway.marvel.com/v1/public/stories?id=' + id + 'ts=1000&apikey=d227faa05f90f594c1959e2f56afef55&hash=b83e662f3ade20d32b8e5e4e80eb439c'
      + '&offset=0&limit=1';

    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      }),
      retry(5)
    );
  }

  public consultaEventsMarvel(id: any) {

    let url =
      'http://gateway.marvel.com/v1/public/events?id=' + id + 'ts=1000&apikey=d227faa05f90f594c1959e2f56afef55&hash=b83e662f3ade20d32b8e5e4e80eb439c'
      + '&offset=0&limit=1';

    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      }),
      retry(5)
    );
  }

  public consultaCreatorsMarvel(id: any) {

    let url =
      'http://gateway.marvel.com/v1/public/creators?id=' + id + 'ts=1000&apikey=d227faa05f90f594c1959e2f56afef55&hash=b83e662f3ade20d32b8e5e4e80eb439c'
      + '&offset=0&limit=1';

    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      }),
      retry(5)
    );
  }

  /*************BUSQUEDA MORE DETAILS********************/
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

  public consultaByCreatorMarvel(name: any) {
    let arrayName: string[] = name.split(' ');
    if (arrayName.length < 3) {
      let firstName: string = arrayName[0];
      let lastName: string = arrayName[1];
      let url =
        'http://gateway.marvel.com/v1/public/creators?firstName='+firstName+'&lastName='+lastName+'&ts=1000&apikey=d227faa05f90f594c1959e2f56afef55&hash=b83e662f3ade20d32b8e5e4e80eb439c'
        + '&offset=0&limit=1';
      return this.http.get(url).pipe(
        map((res: any) => {
          return res;
        }),
        retry(5)
      );
    } else {
      let firstName: string = arrayName[0];
      let middleName: string = arrayName[1];
      let lastName: string = arrayName[2];
      let url =
        'http://gateway.marvel.com/v1/public/creators?firstName='+firstName+'&middleName='+middleName+'&lastName='+lastName+'&ts=1000&apikey=d227faa05f90f594c1959e2f56afef55&hash=b83e662f3ade20d32b8e5e4e80eb439c'
        + '&offset=0&limit=1';
      return this.http.get(url).pipe(
        map((res: any) => {
          return res;
        }),
        retry(5)
      );
    }


  }
}
