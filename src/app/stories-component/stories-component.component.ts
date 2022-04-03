import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';

@Component({
  selector: 'app-stories-component',
  templateUrl: './stories-component.component.html',
  styleUrls: ['./stories-component.component.css']
})
export class StoriesComponentComponent implements OnInit {

  title = 'marvelApp';

  public comics: Array<any> = [];
  public TitleComic: any = 'Avengers';
  public offset: any = '0';
  public limit: any = '100';

  constructor(private comic: ApiService) {}

  ngOnInit(): void {
    this.comic.consultaStoriesMarvel(this.offset, this.limit).subscribe((res) => {
      console.log('Respuesta', res);
      this.comics = res.data.results;
    });
  }

}
