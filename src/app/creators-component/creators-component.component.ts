import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';

@Component({
  selector: 'app-creators-component',
  templateUrl: './creators-component.component.html',
  styleUrls: ['./creators-component.component.css']
})
export class CreatorsComponentComponent implements OnInit {

  title = 'Marvel-Creators';

  public creators: Array<any> = [];
  public offset: any = '0';
  public limit: any = '100';

  constructor(private comic: ApiService) {}

  ngOnInit(): void {

    this.comic.consultaCreatorsMarvel(this.offset, this.limit).subscribe((res) => {
      console.log('Respuesta', res);
      this.creators = res.data.results;
      console.log(this.creators);
    });
  }

}
