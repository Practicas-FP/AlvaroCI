import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';
@Component({
  selector: 'app-comics-component',
  templateUrl: './comics-component.component.html',
  styleUrls: ['./comics-component.component.css']
})
export class ComicsComponentComponent implements OnInit {

  title = 'marvelApp';

  public comics: Array<any> = [];
  public TitleComic: any = 'Avengers';
  public offset: any = '0';
  public limit: any = '100';

  constructor(private comic: ApiService) {}

  ngOnInit(): void {
    this.comic.consultaComicsMarvel(this.TitleComic, this.offset, this.limit).subscribe((res) => {
      console.log('Respuesta', res);
      this.comics = res.data.results;
    });
  }

}
