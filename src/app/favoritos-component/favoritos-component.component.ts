import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthFirebaseService } from '../service/firebase/auth-firebase.service';

@Component({
  selector: 'app-favoritos-component',
  templateUrl: './favoritos-component.component.html',
  styleUrls: ['./favoritos-component.component.css']
})
export class FavoritosComponentComponent implements OnInit {

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
