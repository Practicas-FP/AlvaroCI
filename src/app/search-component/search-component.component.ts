import { Output, EventEmitter, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetallesApiService } from '../service/api/detalles-api.service';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.css']
})
export class SearchComponentComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<any>();

  constructor(private searchByName: DetallesApiService, private route: Router) { }

  search(value: any) {
    this.newItemEvent.emit(value);
  }

  ngOnInit(): void {
  }

  onKeyup(key2: string) {
    console.log(key2);
    this.route.navigate(['/comics', key2])
  }

  btnSearch(key2: string) {
    console.log(key2);
    this.searchByName.consultaByTitleMarvel(key2);
  }

}
