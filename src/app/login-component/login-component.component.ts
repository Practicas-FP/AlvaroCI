import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFirebaseService } from '../auth-firebase.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  @ViewChild("cajamail") cajamail! : ElementRef;
  @ViewChild("cajapassword") cajapassword! : ElementRef;

  constructor(private auth : AuthFirebaseService, private router: Router) { }

  ngOnInit(): void {
  }

  logIn():void{
    var mail = this.cajamail.nativeElement.value;
    var contra = this.cajapassword.nativeElement.value;
    this.auth.login(mail, contra).then(res=> {
      console.log(res);
      this.router.navigate(['perfil']);
    });
  }

  logInGoogle():void{
    this.auth.loginGoogle().then(res=>{
      console.log(res);
      this.router.navigate(['perfil']);
    });
  }
}
