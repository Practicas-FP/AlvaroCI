import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFirebaseService } from '../services/firebase/auth-firebase.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private auth: AuthFirebaseService) { }

  ngOnInit(): void {
  }

  logIn(email: any, pass: any): void{
    if(email === '' && pass === ''){

    }else{
      this.auth.login(email, pass).then(res=> {
        console.log(res);
        this.router.navigate(['profile']);
      });
    }

  }

  logInGoogle(): void{
    this.auth.loginGoogle().then(res=>{
      console.log(res);
      this.router.navigate(['profile']);
    });
  }

}
