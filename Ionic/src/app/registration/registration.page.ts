import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthFirebaseService } from '../services/firebase/auth-firebase.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  constructor(private router: Router, private auth: AuthFirebaseService, private toastCtrl: ToastController) { }

  ngOnInit(): void {
  }

  async presentToast( message: string) {
    const toast = await this.toastCtrl.create({
    message,
    duration: 2000
    });
    toast.present();
  }

  async logIn(email: any, pass: any): Promise<void>{
    const user = await this.auth.registro(email, pass);
    if(user){
      this.router.navigate(['profile']);
    }else{
      this.presentToast('Error, try with Google');
    }
  }

  logInGoogle(): void{
    this.auth.loginGoogle().then(res=>{
      console.log(res);
      this.router.navigate(['profile']);
    });
  }

}
