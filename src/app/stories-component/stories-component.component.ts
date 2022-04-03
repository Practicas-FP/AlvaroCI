import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';

@Component({
  selector: 'app-stories-component',
  templateUrl: './stories-component.component.html',
  styleUrls: ['./stories-component.component.css']
})
export class StoriesComponentComponent implements OnInit {

  title = 'Marvel-Stories';

  public stories: Array<any> = [];
  public offset: any = '0';
  public limit: any = '100';

  constructor(private storie: ApiService) {}

  ngOnInit(): void {
    this.storie.consultaStoriesMarvel(this.offset, this.limit).subscribe((res) => {
      console.log('Respuesta', res);
      this.stories = res.data.results;
    });
  }

}
