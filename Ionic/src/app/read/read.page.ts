/* eslint-disable no-var */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { child, get, getDatabase, ref } from 'firebase/database';
import { ApiService } from '../services/api.service';
import { AuthFirebaseService } from '../services/firebase/auth-firebase.service';
import { ReadService } from '../services/firebase/read.service';


@Component({
  selector: 'app-read',
  templateUrl: './read.page.html',
  styleUrls: ['./read.page.scss'],
})
export class ReadPage implements OnInit {

  public logueado: boolean;
  public usuario: any;
  public uid = 'invitado';

  public action: Array<any> = ['character', 'comic', 'creator', 'events', 'serie', 'stories'];

  public viewReadCh: Array<any> = [];
  public viewReadCo: Array<any> = [];
  public viewReadCr: Array<any> = [];
  public viewReadEv: Array<any> = [];
  public viewReadSe: Array<any> = [];
  public viewReadSt: Array<any> = [];
  public cp = 0;

  read = true;
  public idSearch = 'noID';
  public iconRead = 'eye';

  constructor(private service: AuthFirebaseService, private addRead: ReadService,
    private actionSheetController: ActionSheetController, private searchApi: ApiService,
    private toastCtrl: ToastController, private route: Router) {
    this.logueado = false;
  }

  ngOnInit() {
    this.usuarioLogueado();
  }

  usuarioLogueado() {
    this.service.getInfoUsuarioLoggeado().subscribe((res) => {
      if (res != null) {
        this.logueado = true;
        this.usuario = res;
        this.uid = res.uid;
        this.comprobarRead();
      } else {
        this.logueado = false;
        this.uid = 'invitado';
        this.route.navigate(['login']);
      }
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  detallesSearch(id: string, newaction: string) {
    this.route.navigate(['details/', id], { queryParams: { action: newaction } });
  }

  comprobarRead() {
    const dbRef = ref(getDatabase());
    this.action.forEach(element => {
      get(child(dbRef, `users/${this.uid}/leido/${element}`)).then((snapshot) => {
        if (snapshot.exists()) {
          const array: Array<any> = [];
          switch (element) {
            case 'comic':
              var data = snapshot.val();
              array.push(data);

              for (const [key] of Object.entries(array[0])) {
                this.searchApi.consultaIDMarvel(`comics`, `${key}`).subscribe((res) => {
                  this.viewReadCo.push(res.data.results[0]);
                });
              }
              break;
            case 'serie':
              var data = snapshot.val();
              array.push(data);

              for (const [key] of Object.entries(array[0])) {
                this.searchApi.consultaIDMarvel(`series`, `${key}`).subscribe((res) => {
                  this.viewReadSe.push(res.data.results[0]);
                });
              }
              break;
            case 'stories':
              var data = snapshot.val();
              array.push(data);

              for (const [key] of Object.entries(array[0])) {
                this.searchApi.consultaIDMarvel(`stories`, `${key}`).subscribe((res) => {
                  this.viewReadSt.push(res.data.results[0]);
                });
              }
              break;
            case 'creator':
              var data = snapshot.val();
              array.push(data);

              for (const [key] of Object.entries(array[0])) {
                this.searchApi.consultaIDMarvel(`creators`, `${key}`).subscribe((res) => {
                  this.viewReadCr.push(res.data.results[0]);
                });
              }
              break;
            case 'character':
              var data = snapshot.val();
              array.push(data);

              for (const [key] of Object.entries(array[0])) {
                this.searchApi.consultaIDMarvel(`characters`, `${key}`).subscribe((res) => {
                  this.viewReadCh.push(res.data.results[0]);
                });
              }
              break;
            case 'events':
              var data = snapshot.val();
              array.push(data);

              for (const [key] of Object.entries(array[0])) {
                this.searchApi.consultaIDMarvel(`events`, `${key}`).subscribe((res) => {
                  this.viewReadEv.push(res.data.results[0]);
                });
              }
              break;
          }
        }
      });
    });
  }

  eliminarRead(action: string) {
    console.log(this.idSearch);
    this.addRead.quitarRead(this.uid, action, this.idSearch);
  }

  async presentActionSheet(id: any, newAction: string, title: string) {
    this.idSearch = id;
    const actionSheet = await this.actionSheetController.create({
      header: title,
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'More Details',
        icon: 'add-circle',
        role: 'details',
        data: 0,
        handler: () => {
          this.route.navigate(['/details', this.idSearch], { queryParams: { action: newAction } });
        }
      }, {
        text: 'Read',
        icon: this.iconRead,
        role: 'Read',
        data: 0,
        handler: () => {
          if (this.read) {
            this.eliminarRead(newAction);
            this.presentToast('Read Deleted');
            location.reload();
          }
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data =>... ', role, data);
  }
}
