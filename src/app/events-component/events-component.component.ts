import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';

@Component({
  selector: 'app-events-component',
  templateUrl: './events-component.component.html',
  styleUrls: ['./events-component.component.css']
})
export class EventsComponentComponent implements OnInit {

  title = 'Marvel-Events';

  public events: Array<any> = [];
  public offset: any = '0';
  public limit: any = '100';

  constructor(private event: ApiService) {}

  ngOnInit(): void {
    this.event.consultaEventsMarvel(this.offset, this.limit).subscribe((res) => {
      console.log('Respuesta', res);
      this.events = res.data.results;
    });
  }

}
