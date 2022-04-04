import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthFirebaseService } from '../service/firebase/auth-firebase.service';

@Component({
  selector: 'app-vistos-component',
  templateUrl: './vistos-component.component.html',
  styleUrls: ['./vistos-component.component.css']
})
export class VistosComponentComponent implements OnInit {

  constructor(public authService: AuthFirebaseService, public router: Router) { }

  ngOnInit(): void { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.getInfoUsuarioLoggeado()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
