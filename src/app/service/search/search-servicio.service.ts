import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comic } from 'src/app/interface/comicInterface.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchServicioService {

  constructor(private http: HttpClient) { }

  public searchByName(query = ''){
    return this.http.get<Comic[]>(`${environment.baseURLcomics}&titleStartsWith=${query}`);
  }
  public getDetails(id: number){
    return this.http.get<Comic[]>(`${environment.baseURLcomics}&id =${id}`);
  }
}
