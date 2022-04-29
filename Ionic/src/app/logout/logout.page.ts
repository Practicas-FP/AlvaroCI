import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFirebaseService } from '../services/firebase/auth-firebase.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private service: AuthFirebaseService, private router: Router) { }

  ngOnInit(): void {
    this.logOut();
  }

  logOut(){
    this.service.logOut();
    this.router.navigate(['']);
  }
}
