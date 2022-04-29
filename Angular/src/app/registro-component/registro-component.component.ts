import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFirebaseService } from '../service/firebase/auth-firebase.service';

@Component({
  selector: 'app-registro-component',
  templateUrl: './registro-component.component.html',
  styleUrls: ['./registro-component.component.css'],
})
export class RegistroComponentComponent implements OnInit {
  @ViewChild('email') email!: ElementRef;
  @ViewChild('password') password!: ElementRef;

  constructor(private auth: AuthFirebaseService, private router: Router) {}

  ngOnInit(): void {}

  registro(): void {
    var email = this.email.nativeElement.value;
    var contra = this.password.nativeElement.value;
    this.auth.registro(email, contra).then((res) => {
      console.log(res);
      this.router.navigate(['perfil']);
    });
  }

  logInGoogle(): void {
    this.auth.loginGoogle().then((res) => {
      console.log(res);
      this.router.navigate(['perfil']);
    });
  }
}
