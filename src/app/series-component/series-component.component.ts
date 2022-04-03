import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';

@Component({
  selector: 'app-series-component',
  templateUrl: './series-component.component.html',
  styleUrls: ['./series-component.component.css']
})
export class SeriesComponentComponent implements OnInit {

  title = 'Marvel-Series';

  public series: Array<any> = [];
  public offset: any = '0';
  public limit: any = '100';

  constructor(private serie: ApiService) {}

  ngOnInit(): void {
    this.serie.consultaSeriesMarvel(this.offset, this.limit).subscribe((res) => {
      console.log('Respuesta', res);
      this.series = res.data.results;
    });
  }

}
