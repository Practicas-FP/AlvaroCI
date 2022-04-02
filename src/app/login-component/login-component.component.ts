import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthFirebaseService } from '../service/firebase/auth-firebase.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  loginForm = new FormGroup({
    usuario : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  })

  @ViewChild("email") email! : ElementRef;
  @ViewChild("password") password! : ElementRef;

  constructor(private auth : AuthFirebaseService, private router: Router) { }

  ngOnInit(): void {
  }

  logIn():void{
    var email = this.email.nativeElement.value;
    var contra = this.password.nativeElement.value;
    this.auth.login(email, contra).then(res=> {
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
